import "../css/ContactForm.css"
import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

// Simulazione del DatePicker (sostituisci con react-datepicker se disponibile)
const DatePicker = ({ selected, onChange, placeholderText, dateFormat, className, id }) => {
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <input
      id={id}
      type="date"
      className={className}
      value={selected ? selected.toISOString().split('T')[0] : ''}
      onChange={(e) => onChange(e.target.value ? new Date(e.target.value) : null)}
      placeholder={placeholderText}
    />
  );
};

export default function ContactForm() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: null
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [errors, setErrors] = useState({});
  const form = useRef();

  // Configurazione EmailJS (sostituisci con i tuoi ID reali)
  const SERVICE_ID = 'service_bcmu9jy';
  const TEMPLATE_ID = 'template_3jg5m0v';
  const PUBLIC_KEY = 'E_sIterd9dQ09ou5A';

  // Inizializza EmailJS
  React.useEffect(() => {
    emailjs.init(PUBLIC_KEY);
  }, []);

  // Gestione cambio input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Rimuovi errore se l'utente inizia a digitare
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Gestione cambio data
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormData(prev => ({
      ...prev,
      date: date
    }));

    if (errors.date) {
      setErrors(prev => ({
        ...prev,
        date: ''
      }));
    }
  };

  // Validazione form
  const validateForm = () => {
    const newErrors = {};

    // Validazione nome
    if (!formData.name.trim()) {
      newErrors.name = 'Il nome è obbligatorio';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Il nome deve contenere almeno 2 caratteri';
    }

    // Validazione email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email è obbligatoria';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Inserisci un\'email valida';
    }

    // Validazione telefono OBBLIGATORIO
    if (!formData.phone.trim()) {
      newErrors.phone = 'Il telefono è obbligatorio';
    } else {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Inserisci un numero di telefono valido';
      }
    }

    // Validazione data
    if (!selectedDate) {
      newErrors.date = 'Seleziona una data';
    } else if (selectedDate < new Date().setHours(0, 0, 0, 0)) {
      newErrors.date = 'La data non può essere nel passato';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gestione invio form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessage({
        type: 'error',
        text: 'Per favore correggi gli errori nel form'
      });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Prepara i dati per EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Non fornito',
        preferred_date: selectedDate ? selectedDate.toLocaleDateString('it-IT') : 'Non specificata',
        to_name: 'Team', // Nome del destinatario
        message: `
          Nuovo contatto dal form:
          
          Nome: ${formData.name}
          Email: ${formData.email}
          Telefono: ${formData.phone || 'Non fornito'}
          Data preferita: ${selectedDate ? selectedDate.toLocaleDateString('it-IT') : 'Non specificata'}
        `
      };

      // Invia email
      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams
      );

      if (result.status === 200) {
        setMessage({
          type: 'success',
          text: 'Messaggio inviato con successo! Ti contatteremo presto.'
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: null
        });
        setSelectedDate(null);
      }
    } catch (error) {
      console.error('Errore invio email:', error);
      setMessage({
        type: 'error',
        text: 'Errore nell\'invio del messaggio. Riprova più tardi.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contatti" className="contact-section">
      <div className="contact-separator">
        <h3 className="contact-separator-text">WE THINK / WE DO / YOU WIN</h3>
      </div>

      <div className="form-container">
        <h2 className="form-title">PRONTO A FAR CRESCERE IL TUO BRAND?</h2>
        <p className="form-subtitle">
          Prenota una call con il nostro team e<br />
          scopri come possiamo aiutarti a<br />
          creare un'identità visiva e campagne<br />
          video oltre gli schemi.
        </p>

        {/* Messaggio di feedback */}
        {message.text && (
          <div className={`message ${message.type}`} style={{
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            backgroundColor: message.type === 'success' ? '#d4edda' : '#000000',
            color: message.type === 'success' ? '#155724' : '#ff0000',
            border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
          }}>
            {message.text}
          </div>
        )}

        <div
          ref={form}
          className="contact-form"
        >
          <div className="form-group">
            <label htmlFor="name">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Nome e Cognome"
                required
                autoComplete="name"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? 'error' : ''}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="La tua E-mail"
                required
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
                disabled={loading}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="Numero di telefono"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className={errors.phone ? 'error' : ''}
                disabled={loading}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </label>
          </div>

          <div className="form-group calendar-group">
            <label htmlFor="date">
              <DatePicker
                id="date"
                selected={selectedDate}
                onChange={handleDateChange}
                placeholderText="Seleziona la data"
                dateFormat="dd/MM/yyyy"
                className={`calendar-input ${errors.date ? 'error' : ''}`}
                disabled={loading}
              />
              {errors.date && <span className="error-message">{errors.date}</span>}
            </label>
          </div>

          <button
            onClick={handleSubmit}
            className="submit-btn"
            disabled={loading}
            style={{
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'INVIO IN CORSO...' : 'INIZIAMO!'}
          </button>

          <p className="form-disclaimer">
            Compilando il modulo accetti la nostra <a href="#privacy">Privacy Policy</a>
          </p>
        </div>
      </div>
    </section>
  )
}

