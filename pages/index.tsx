import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'
import axios from 'axios'

interface Data {
  name: string;
  email: string;
  number: string;
  cpf: string;
}

interface FormErrors {
  name?: string;
  number?: string;
  email?: string;
  cpf?: string;
}

export default function Home() {
  const [data, setData] = useState<Data>({
    email: '',
    number: '',
    name: '',
    cpf: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setData(oldData => ({ ...oldData, [name]: value }));
    setErrors((oldErrors: FormErrors) => ({ ...oldErrors, [name]: '' }));
  }

  const validateForm = () => {
    const newErrors: FormErrors = {};

    const emailRegex = /^([\w_]|\.)*([\w_]|\.){2}@([\w_]|\.)*([\w_]|\.){2}\.[a-z]{3}$/i;
    const nameRegex = /^[a-zA-Z ]{1,50}$/i;
    const cpfRegex = /^([0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2})|([0-9]{11})$/i;
    const numberRegex = /^(\([0-9]{2}\)[0-9]{5}\-[0-9]{4})|([0-9]{11})$/i;

    if(!emailRegex.test(data.email)) {
      newErrors.email = 'Formato de email inválido';
    } 
    if (!nameRegex.test(data.name)) {
      newErrors.name = 'Nome só aceita simbolos alfabéticos, até 50 caracteres';
    } 
    if(!numberRegex.test(data.number)) {
      newErrors.number = 'Formato de número inválido';
    } 
    if (!cpfRegex.test(data.cpf)) {
      newErrors.cpf = 'Formato de cpf inválido';
    }

    setErrors(newErrors);

    // Retorna true se não houver erros de validação
    return Object.keys(newErrors).length === 0;
  }

  

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if(validateForm()) {
      axios.post('/api/form-validation', data)
        .then(() => {
          console.log('É isso, como a gente achou que ia ser!', data);
          setIsFormSubmitted(true);
          setTimeout(function(){ window. location. reload(); }, 1500);
        })
        .catch((e) => {
          return console.log('Erro ao contactar api', e.number);
      })
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitForm}>
        <h1 className={styles.title}>Form para Validação</h1>
        <div className={styles.inputs}>
          <div>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enzo Kawaii"
              value={data.name}
              onChange={handleChange}
              required
            />
            {errors.name && <span className={styles.errorTag}>{errors.name}</span>}
          </div>
          <div>
            <label htmlFor="number">Phone number</label>
            <input
              type="text"
              name="number"
              placeholder="(00)00000-0000"
              value={data.number}
              onChange={handleChange}
              required
            />
            {errors.number && <span className={styles.errorTag}>{errors.number}</span>}
          </div>
        </div>
        <div>
          <label htmlFor="email">E-mail address</label>
          <input
            name="email"
            id="email"
            placeholder="email@example.io"
            value={data.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className={styles.errorTag}>{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            name="cpf"
            placeholder="000.000.000-00"
            value={data.cpf}
            onChange={handleChange}
            required
          />
          {errors.cpf && <span className={styles.errorTag}>{errors.cpf}</span>}
        </div>
        {isFormSubmitted && (
          <div className={styles.floatingMessage}>
            Formulário enviado com sucesso!
          </div>
        )}
        <button className={styles.btn} type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}
