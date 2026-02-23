
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Mail, 
  ChevronRight, 
  CheckCircle2, 
  Activity, 
  Zap, 
  Loader2, 
  Sparkles, 
  Video,
  ChevronLeft,
  ArrowLeft,
  ArrowRight,
  Target,
  Grip,
  Cpu,
  AlertCircle,
  Lock 
} from 'lucide-react';
import { Language } from '../types';
import { supabase } from '../supabaseClient';

interface BookingProps {
  lang: Language;
}

type BookingStep = 1 | 2 | 3;

export const Booking: React.FC<BookingProps> = ({ lang }) => {
  const [step, setStep] = useState<BookingStep>(1);
  const [viewDate, setViewDate] = useState(new Date()); 
  const [selectedFullDate, setSelectedFullDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isChecking, setIsChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  const t = {
    it: {
      label: "VIDEO CALL BOOKING",
      title: "inizia a",
      span: "KREARE.",
      desc: "Naviga nel calendario per selezionare uno slot per la tua sessione strategica individuale.",
      steps: ["DATA", "ORARIO", "CONTATTO"],
      morning: "MORNING WINDOW",
      afternoon: "AFTERNOON WINDOW",
      placeholderName: "IDENTIFICATIVO / NOME",
      placeholderEmail: "COMM CHANNEL / EMAIL",
      ctaNext: "INIZIALIZZA",
      ctaBack: "INDIETRO",
      ctaFinal: "GENERA UPLINK",
      success: "UPLINK STABILITO",
      successDesc: "Prenotazione confermata. Riceverai un'email di riepilogo a:",
      weekdays: ["DOM", "LUN", "MAR", "MER", "GIO", "VEN", "SAB"],
      months: ["GENNAIO", "FEBBRAIO", "MARZO", "APRILE", "MAGGIO", "GIUGNO", "LUGLIO", "AGOSTO", "SETTEMBRE", "OTTOBRE", "NOVEMBRE", "DICEMBRE"],
      error: "Errore durante la connessione al database. Riprova.",
      alreadyBooked: "Spiacenti, questo orario è stato appena occupato da un altro utente.",
      checkingSlots: "SYNCING AVAILABILITY..."
    },
    en: {
      label: "VIDEO CALL BOOKING",
      title: "start",
      span: "KREATING.",
      desc: "Navigate the calendar to select a slot for your 1-on-1 strategic session.",
      steps: ["DATE", "TIME", "CONTACT"],
      morning: "MORNING WINDOW",
      afternoon: "AFTERNOON WINDOW",
      placeholderName: "IDENTIFIER / NAME",
      placeholderEmail: "COMM CHANNEL / EMAIL",
      ctaNext: "INITIALIZE STEP",
      ctaBack: "BACK",
      ctaFinal: "GENERATE UPLINK",
      success: "UPLINK ESTABLISHED",
      successDesc: "Booking confirmed. You will receive a summary email at:",
      weekdays: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
      months: ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"],
      error: "Error connecting to database. Please try again.",
      alreadyBooked: "Sorry, this slot has just been taken by another user.",
      checkingSlots: "SYNCING AVAILABILITY..."
    }
  }[lang];

  const calendarDays = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    return days;
  }, [viewDate]);

  const changeMonth = (offset: number) => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
  };

  const handleDateSelect = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return;
    setSelectedFullDate(date);
    setSelectedTime(null);
    setSubmitError(null);
  };

  const handleTimeSelect = (time: string) => {
    if (!bookedSlots.includes(time)) {
      setSelectedTime(time);
      setSubmitError(null);
    }
  };

  useEffect(() => {
    if (step === 2 && selectedFullDate) {
      setIsLoadingSlots(true);
      const fetchAvailability = async () => {
        try {
            // Format date as YYYY-MM-DD
            const year = selectedFullDate.getFullYear();
            const month = String(selectedFullDate.getMonth() + 1).padStart(2, '0');
            const day = String(selectedFullDate.getDate()).padStart(2, '0');
            const dateString = `${year}-${month}-${day}`;

            const { data, error } = await supabase
                .from('bookings')
                .select('ora')
                .eq('data', dateString);

            if (error) throw error;

            const occupied = data.map((item: any) => item.ora.slice(0, 5)); // "09:00:00" -> "09:00"
            setBookedSlots(occupied);
        } catch (err) {
            console.error("Error fetching slots from Supabase:", err);
            setBookedSlots([]);
        } finally {
            setIsLoadingSlots(false);
        }
      };
      fetchAvailability();
    }
  }, [step, selectedFullDate]);

  const nextStep = () => {
    if (step === 1 && selectedFullDate === null) return;
    if (step === 2 && selectedTime === null) return;
    
    setIsChecking(true);
    setTimeout(() => {
      setStep(prev => (prev + 1) as BookingStep);
      setIsChecking(false);
    }, 400);
  };

  const prevStep = () => {
    setStep(prev => (prev - 1) as BookingStep);
    setSubmitError(null);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isSubmitting) return;
    if (!formData.name || !formData.email || !selectedFullDate || !selectedTime) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const webhookUrl = 'https://trackless-concerningly-alta.ngrok-free.dev/webhook-test/booking-uplink';
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 15000);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        date: selectedFullDate.toISOString().split('T')[0],
        time: selectedTime
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      if (response.status === 200) {
        setIsConfirmed(true);
      } else {
        setSubmitError(t.error);
      }
    } catch (error: any) {
      console.error('KREA Uplink Error:', error);
      if (error?.name === 'AbortError') {
        setSubmitError(
          lang === 'it'
            ? 'Timeout: nessuna risposta da n8n. Riprova tra pochi istanti.'
            : 'Timeout: no response from n8n. Please try again shortly.'
        );
      } else {
        setSubmitError(t.error);
      }
    } finally {
      window.clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  const isSelected = (date: Date | null) => {
    if (!date || !selectedFullDate) return false;
    return date.toDateString() === selectedFullDate.toDateString();
  };

  const isPast = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isFormValid = formData.name.trim().length > 1 && formData.email.includes('@');
  const submitLabel = lang === 'it' ? 'UPLINK IN CORSO...' : 'UPLINK IN PROGRESS...';

  const TimeButton: React.FC<{ time: string }> = ({ time }) => {
    const isBooked = bookedSlots.includes(time);
    const isActive = selectedTime === time;

    return (
      <button 
        onClick={() => !isBooked && handleTimeSelect(time)} 
        disabled={isBooked}
        className={`py-4 rounded-xl text-[12px] font-mono border transition-all relative overflow-hidden group 
          ${isBooked 
            ? 'bg-red-900/10 border-red-500/20 text-gray-600 cursor-not-allowed opacity-60' 
            : isActive 
              ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]' 
              : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:border-blue-500/30'
          }`}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {time}
          {isBooked && <Lock size={10} className="text-red-500/50" />}
        </span>
        {isActive && !isBooked && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[scan_2s_linear_infinite]"></div>}
        {isBooked && <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(255,0,0,0.05)_5px,rgba(255,0,0,0.05)_10px)]"></div>}
      </button>
    );
  };

  return (
    <section className="py-24 tablet:py-32 laptop:py-40 px-4 xs:px-6 max-w-7xl mx-auto relative overflow-hidden bg-[#020617]" id="booking">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/[0.02] blur-[150px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none hidden md:block">
         <Grip size={120} className="text-blue-500" />
      </div>

      <div className="text-center max-w-4xl mx-auto mb-16 space-y-4 reveal relative z-10">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-blue-600/5 rounded-full border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
          <span className="text-blue-500 font-black text-[9px] tracking-[0.4em] uppercase">{t.label}</span>
        </div>
        
        <h2 className="text-5xl tablet:text-7xl laptop:text-8xl heading font-black leading-none tracking-tighter uppercase text-white flex flex-col items-center">
          <span className="mb-2">{t.title}</span>
          <span className="text-blue-600 drop-shadow-[0_0_30px_rgba(59,130,246,0.4)]">{t.span}</span>
        </h2>
        
        <p className="text-gray-500 text-sm tablet:text-lg font-light italic max-w-xl mx-auto leading-relaxed px-4">
          {t.desc}
        </p>
      </div>

      <div className="max-w-4xl mx-auto reveal">
        <div className="relative group perspective-1000">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>
          
          <div className="relative bg-[#050508]/90 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 p-1 shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50"></div>
            
            <div className="p-6 md:p-12 relative min-h-[500px] flex flex-col">
                <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-blue-500/30"></div>
                <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-blue-500/30"></div>
                <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-blue-500/30"></div>
                <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-blue-500/30"></div>

                <div className="flex items-center justify-between mb-12 px-4 relative">
                   <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -z-10"></div>
                   {t.steps.map((label, i) => (
                     <div key={i} className="flex flex-col items-center gap-3 relative z-10 group/step">
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all duration-500 border relative overflow-hidden ${step > i+1 ? 'bg-blue-600 border-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : step === i+1 ? 'bg-black border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-[#0a0a0c] border-white/10 text-gray-700'}`}>
                          {step === i+1 && <div className="absolute inset-0 bg-blue-500/10 animate-pulse"></div>}
                          {step > i+1 ? <CheckCircle2 size={16} className="text-white" /> : <span className={`text-[10px] font-black ${step === i+1 ? 'text-blue-500' : 'text-gray-700'}`}>0{i+1}</span>}
                        </div>
                        <span className={`text-[8px] font-black tracking-[0.2em] uppercase ${step === i+1 ? 'text-blue-500' : 'text-gray-600'}`}>{label}</span>
                     </div>
                   ))}
                </div>

                <div className="flex-1 flex flex-col justify-center relative">
                  {isChecking || isSubmitting ? (
                    <div className="flex flex-col items-center justify-center animate-fade-in">
                      <div className="relative w-20 h-20 mb-6">
                         <div className="absolute inset-0 border-2 border-blue-500/20 rounded-full"></div>
                         <div className="absolute inset-0 border-t-2 border-blue-500 rounded-full animate-spin"></div>
                         <div className="absolute inset-0 flex items-center justify-center">
                            <Cpu size={24} className="text-blue-500 animate-pulse" />
                         </div>
                      </div>
                      <p className="text-[10px] font-black tracking-[0.4em] text-blue-500 uppercase animate-pulse">
                        {isSubmitting ? "TRANSACTION_IN_PROGRESS..." : "SYNCING_DATA_STREAM..."}
                      </p>
                    </div>
                  ) : isConfirmed ? (
                    <div className="flex flex-col items-center justify-center text-center space-y-8 animate-fade-in py-8">
                      <div className="w-24 h-24 rounded-full bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-500 shadow-[0_0_50px_rgba(59,130,246,0.2)] relative">
                         <div className="absolute inset-0 border border-blue-500 rounded-full animate-ping opacity-20"></div>
                         <CheckCircle2 size={40} />
                      </div>
                      <div className="space-y-4">
                          <h3 className="text-3xl md:text-5xl font-black heading uppercase text-white tracking-tighter">{t.success}</h3>
                          <div className="bg-white/5 rounded-xl p-4 border border-white/10 max-w-sm mx-auto">
                            <p className="text-gray-400 text-xs mb-2 uppercase tracking-widest">{t.successDesc}</p>
                            <p className="text-blue-400 font-mono text-sm">{formData.email}</p>
                          </div>
                      </div>
                    </div>
                  ) : (
                    <div className="animate-fade-in">
                      {step === 1 && (
                        <div className="max-w-xl mx-auto">
                          <div className="flex items-center justify-between mb-8 px-4">
                            <button onClick={() => changeMonth(-1)} className="w-10 h-10 rounded-full glass border border-white/10 hover:border-blue-500/50 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                              <ArrowLeft size={16} />
                            </button>
                            <div className="text-center">
                              <span className="text-xl md:text-2xl font-black heading text-white tracking-tight uppercase block">
                                {t.months[viewDate.getMonth()]}
                              </span>
                              <span className="text-[10px] font-mono text-blue-500 tracking-[0.3em]">{viewDate.getFullYear()}</span>
                            </div>
                            <button onClick={() => changeMonth(1)} className="w-10 h-10 rounded-full glass border border-white/10 hover:border-blue-500/50 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                              <ArrowRight size={16} />
                            </button>
                          </div>

                          <div className="grid grid-cols-7 gap-2 md:gap-3">
                            {t.weekdays.map(wd => (
                              <div key={wd} className="text-center py-2">
                                <span className="text-[8px] md:text-[9px] font-black uppercase text-blue-500/60 tracking-widest">{wd}</span>
                              </div>
                            ))}
                            {calendarDays.map((date, i) => {
                              const past = isPast(date);
                              const selected = isSelected(date);
                              return (
                                <div key={i} className="aspect-square">
                                  {date ? (
                                    <button
                                      onClick={() => handleDateSelect(date)}
                                      disabled={past}
                                      className={`w-full h-full flex flex-col items-center justify-center rounded-lg md:rounded-xl transition-all duration-300 relative group overflow-hidden border ${
                                        selected 
                                          ? 'bg-blue-600 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)] z-10' 
                                          : past 
                                            ? 'opacity-20 cursor-not-allowed border-transparent' 
                                            : 'bg-white/[0.02] border-white/5 hover:border-blue-500/30 hover:bg-white/[0.05]'
                                      }`}
                                    >
                                      <span className={`text-sm md:text-lg font-black font-mono ${selected ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                        {date.getDate()}
                                      </span>
                                      {selected && <div className="absolute inset-0 bg-blue-400/20 animate-pulse"></div>}
                                      {!past && !selected && <div className="absolute bottom-1 right-1 w-1 h-1 bg-white/20 rounded-full group-hover:bg-blue-500 transition-colors"></div>}
                                    </button>
                                  ) : <div className="w-full h-full"></div>}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {step === 2 && (
                        <div className="max-w-xl mx-auto space-y-10">
                           <div className="text-center">
                              <span className="text-xs font-mono text-gray-500 uppercase tracking-widest block mb-2">DATE_SELECTED</span>
                              <div className="text-2xl md:text-3xl font-black text-white heading uppercase">
                                {selectedFullDate?.getDate()} {t.months[selectedFullDate?.getMonth() || 0]}
                              </div>
                           </div>

                           {isLoadingSlots ? (
                             <div className="py-20 flex flex-col items-center justify-center opacity-70">
                               <Loader2 className="animate-spin text-blue-500 mb-4" size={32} />
                               <span className="text-[10px] font-black tracking-[0.3em] text-blue-400 uppercase animate-pulse">
                                 {t.checkingSlots}
                               </span>
                             </div>
                           ) : (
                             <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                  <div className="flex items-center gap-2 mb-2">
                                     <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                                     <p className="text-[9px] font-black text-gray-500 tracking-widest uppercase">{t.morning}</p>
                                  </div>
                                  <div className="grid grid-cols-2 gap-3">
                                    {['09:00', '10:00', '11:00', '12:00'].map(time => (
                                      <TimeButton key={time} time={time} />
                                    ))}
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <div className="flex items-center gap-2 mb-2">
                                     <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                                     <p className="text-[9px] font-black text-gray-500 tracking-widest uppercase">{t.afternoon}</p>
                                  </div>
                                  <div className="grid grid-cols-2 gap-3">
                                    {['15:00', '16:00', '17:00', '18:00'].map(time => (
                                      <TimeButton key={time} time={time} />
                                    ))}
                                  </div>
                                </div>
                             </div>
                           )}
                        </div>
                      )}

                      {step === 3 && (
                        <div className="max-w-md mx-auto space-y-6 pt-4">
                          <div className="flex items-center justify-between bg-blue-900/10 border border-blue-500/20 p-4 rounded-xl mb-6">
                             <div className="flex items-center gap-4">
                                <div className="text-center">
                                   <div className="text-[9px] text-blue-400 font-bold uppercase tracking-widest">DATE</div>
                                   <div className="text-white font-mono font-bold">{selectedFullDate?.getDate()}/{selectedFullDate ? selectedFullDate.getMonth() + 1 : ''}</div>
                                </div>
                                <div className="w-[1px] h-8 bg-blue-500/20"></div>
                                <div className="text-center">
                                   <div className="text-[9px] text-blue-400 font-bold uppercase tracking-widest">TIME</div>
                                   <div className="text-white font-mono font-bold">{selectedTime}</div>
                                </div>
                             </div>
                             <Target className="text-blue-500 animate-pulse" size={20} />
                          </div>

                          <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative group/input">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within/input:text-blue-500 transition-colors" size={18} />
                              <input 
                                required 
                                type="text" 
                                placeholder={t.placeholderName} 
                                value={formData.name}
                                onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                                className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl py-5 pl-12 pr-6 text-white text-sm outline-none focus:border-blue-500/50 transition-all font-mono tracking-wide placeholder-gray-700" 
                              />
                            </div>
                            <div className="relative group/input">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within/input:text-blue-500 transition-colors" size={18} />
                              <input 
                                required 
                                type="email" 
                                placeholder={t.placeholderEmail} 
                                value={formData.email}
                                onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                                className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl py-5 pl-12 pr-6 text-white text-sm outline-none focus:border-blue-500/50 transition-all font-mono tracking-wide placeholder-gray-700" 
                              />
                            </div>
                          </form>
                          
                          <div className="flex items-center gap-3 px-4 py-3 bg-blue-500/5 border border-blue-500/10 rounded-lg">
                            <Activity size={14} className="text-blue-500" />
                            <span className="text-[9px] font-mono text-blue-300/60 uppercase tracking-widest">ENCRYPTED_CHANNEL: ACTIVE</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {!isConfirmed && !isChecking && !isSubmitting && (
                  <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between gap-4">
                    {step > 1 ? (
                      <button onClick={prevStep} className="flex items-center gap-2 px-6 py-3 rounded-full hover:bg-white/5 text-[9px] font-black tracking-widest text-gray-500 hover:text-white transition-all uppercase group">
                        <ChevronLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> {t.ctaBack}
                      </button>
                    ) : <div />}
                    
                    <button 
                      onClick={step < 3 ? nextStep : (e) => handleSubmit(e)}
                      disabled={
                        isSubmitting ||
                        (step === 1 && selectedFullDate === null) || 
                        (step === 2 && (selectedTime === null || isLoadingSlots)) || 
                        (step === 3 && !isFormValid)
                      }
                      className="bg-blue-600 hover:bg-white hover:text-black py-4 px-10 rounded-full text-white text-[10px] font-black tracking-[0.2em] uppercase shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] disabled:opacity-20 disabled:shadow-none flex items-center justify-center gap-3 transition-all group duration-500"
                    >
                      {step === 3 ? (isSubmitting ? submitLabel : t.ctaFinal) : t.ctaNext}
                      {step < 3 ? <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" /> : <Zap size={14} className="group-hover:fill-black" />}
                    </button>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
      {submitError && (
        <div className="fixed bottom-6 right-6 z-[2000]">
          <div className="glass px-6 py-4 rounded-2xl border border-red-500/40 bg-black/80 shadow-[0_0_40px_rgba(248,113,113,0.35)] flex items-center gap-3">
            <AlertCircle size={18} className="text-red-400 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-red-400">UPLINK_ERROR</span>
              <span className="text-xs text-red-100">{submitError}</span>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes scan {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.3s ease-in-out 0s 2; }
      `}</style>
    </section>
  );
};
