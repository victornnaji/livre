import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components'
import { media, theme } from 'styles';

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
           <StyledFormikField name="username" />
           {errors.username && touched.username ? (
             <div className="field-error">{errors.username}</div>
           ) : null}
           <StyledFormikField name="password" type="password" className="password"/>
           {errors.password && touched.password ? (
             <div className="field-error">{errors.password}</div>
           ) : null}
           <StyledFormikButton type="submit">{buttonText}</StyledFormikButton>
         </StyledFormikForm>
       )}
     </Formik>
    )
}

const StyledFormikForm = styled(Form)`
    display: flex;
    flex-direction: column;

    .password{
      margin-top: 1rem;
    }

    .button{
        margin-top: 2rem;
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
    font-size: 16px;
    font-weight: 500;
    border: none;
    color: #fff;
    font-family: ${theme.fonts.Nunito};
    font-weight: 700;
    cursor: pointer;
    margin-top: 2rem;
`

export default AuthForm
