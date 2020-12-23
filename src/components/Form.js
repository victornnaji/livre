import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components'
import { media, theme } from 'styles';
import { motion } from "framer-motion"

const transition = { duration: .5, ease: [0.43, 0.13, 0.23, 0.96] };
const buttonVariants = {
    initial: { scale: 0.5, opacity: 0 },
    exit: { scale: 0.5, y: "50%", opacity: 0, transition: { duration: 1.5, ...transition } },
    enter: {
        y: "0%",
        scale: 1,
        opacity: 1,
        transition
    }
};

const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    password: Yup.string()
      .required('Required')
  });
const AuthForm = ({onSubmit, buttonText}) => {
    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={values => {
                // same shape as initial values
                onSubmit(values);
            }}
        >
        {({ errors, touched }) => (
         <StyledFormikForm>
           <motion.div 
            initial="initial"
            animate="enter"
            exit="exit"
            variants={{ exit: { transition: { staggerChildren: 0.1 } } }}
           >
            <motion.div variants={buttonVariants}><StyledFormikField name="username"/></motion.div>
            {errors.username && touched.username ? (
                <div className="field-error">{errors.username}</div>
            ) : null}
            <motion.div variants={buttonVariants}>
                <StyledFormikField name="password" type="password" className="password"/>
            </motion.div>
            {errors.password && touched.password ? (
                <div className="field-error">{errors.password}</div>
            ) : null}
            <motion.div variants={buttonVariants} className="button-container">
                <StyledFormikButton type="submit">{buttonText}</StyledFormikButton>
            </motion.div>
           </motion.div>
         </StyledFormikForm>
       )}
     </Formik>
    )
}

const StyledFormikForm = styled(Form)`
    display: flex;
    flex-direction: column;

    .password{
      margin-top: 1.2rem;
    }

    .button-container{
        width: 100%;
    }

    .field-error{
        margin-top: 1rem;
        font-size: 1.2rem;
        font-family: ${theme.fonts.Nunito};
        color: ${theme.colors.secondary};
        font-weight: 700;
    }
`;

const StyledFormikField = styled(Field)`
  border-radius: 1.2rem;
  font-size: 3rem;
  outline: none;
  padding: 2rem;
  border: .2rem solid #333;
  font-family: ${theme.fonts.Nunito};
  font-weight: 700;
  box-sizing: border-box;
  width: 100%; 

  ${media.phablet`
    border-radius: .9rem;
    font-size: 2.4rem;
    outline: none;
    padding: 1.5rem;
  `}
`;

const StyledFormikButton = styled.button`
    padding: 1.5rem 5rem;
    border-radius: 4px;
    background-color: ${theme.colors.primary};
    font-size: 1.6rem;
    font-weight: 500;
    border: none;
    color: #fff;
    font-family: ${theme.fonts.Nunito};
    font-weight: 700;
    cursor: pointer;
    margin-top: 2rem;
    width: 100%;
`

export default AuthForm
