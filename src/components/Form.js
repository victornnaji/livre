import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components'
import { media, mixin, theme } from 'styles';
import { motion } from "framer-motion"
import { StyledButton } from './Button';
import { useAsync } from 'hooks/use-async';
import Spinner from 'assets/Spinner';

const transition = { duration: .9, ease: [0.43, 0.13, 0.23, 0.96] };
const buttonVariants = {
    initial: { y: 70, opacity: 0 },
    exit: { 
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 , ...transition}
        }
     },
    enter: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100, ...transition }
        }
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
const AuthForm = ({onSubmit, buttonText, register, registerClick}) => {

    const {isLoading, isError, error, run} = useAsync()

    return (
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same shape as initial values
          run(onSubmit(values));
        }}
      >
        {({ errors, touched }) => (
          <StyledFormikForm>
            <motion.div
              initial="initial"
              animate="enter"
              exit="exit"
              variants={{
                exit: {
                  transition: { staggerChildren: 1.05, staggerDirection: -1 },
                },
                enter: {
                  transition: { staggerChildren: 0.07, delayChildren: 0.5},
                },
              }}
            >
              <motion.h2 variants={buttonVariants} className="auth-heading">{register ? "Sign up" : "Log in"}</motion.h2>
              <motion.div variants={buttonVariants}>
                <StyledFormikField name="username" />
              </motion.div>
              {errors.username && touched.username ? (
                <div className="field-error">{errors.username}</div>
              ) : null}
              <motion.div variants={buttonVariants}>
                <StyledFormikField
                  name="password"
                  type="password"
                  className="password"
                />
              </motion.div>
              {errors.password && touched.password ? (
                <div className="field-error">{errors.password}</div>
              ) : null}
              <motion.div
                variants={buttonVariants}
                className="button-container"
              >
                <StyledButton type="submit" disabled={errors.password || errors.username} className="auth-btn">
                  {buttonText} {isLoading ? (<span><Spinner /></span>) : null}
                </StyledButton>
              </motion.div>
              {isError ? (
                <div style={{fontSize: '1.4rem'}} className="field-error">{error.message}</div>
              ) : null}
              <motion.div variants={buttonVariants} className="auth-redirect">{register ? (<p>Already a user? <span onClick={registerClick}>Login now</span></p>): (<p>don't have an account? <span onClick={registerClick}>join now.</span></p>)}</motion.div>
            </motion.div>
          </StyledFormikForm>
        )}
      </Formik>
    );
}

const StyledFormikForm = styled(Form)`
    display: flex;
    flex-direction: column;

    .password{
      margin-top: 1.2rem;
    }

    .button-container{
        width: 100%;
        margin-top: 2rem;

        .auth-btn{
          ${mixin.flexCenter}

          span{
            margin-left: 1rem;
            transform: translateY(.3rem)
          }
        }
    }

    .field-error{
        margin-top: 1rem;
        font-size: 1.2rem;
        font-family: ${theme.fonts.Nunito};
        color: ${theme.colors.secondary};
        font-weight: 700;
    }

    .auth-heading{
      margin-bottom: 3rem;
      font-size: 2.5rem;
      text-align: center;
      text-transform: uppercase;
      font-weight: 700;
    }

    .auth-redirect{
      margin-top: 2rem;
      font-size: 1.8rem;
      text-align: right;

      span{
        color: ${theme.colors.tertiary};
        cursor: pointer;
        font-weight: 700;
        text-transform: capitalize;
      }
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

export default AuthForm
