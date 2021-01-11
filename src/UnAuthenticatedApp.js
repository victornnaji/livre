import React from 'react';
import AuthDoddle from 'assets/AuthDoddle';
import Logo from 'assets/Logo';
import AuthForm from 'components/Form';
import styled from 'styled-components';
import { media, mixin, theme } from 'styles';
import { AnimatePresence , motion} from "framer-motion";

function UnAuthenticatedApp({login, register}) {

  const [showRegister, setShowRegister] = React.useState(false);

  const handleRegisterClick = () => {
    setShowRegister(!showRegister);
  }

  const transition = {
    duration: 1,
    ease: [0.43, 0.13, 0.23, 0.96]
  };

  const MotionAuthContent = motion.custom(AuthContent);
  const imageVariants = {
    exit: { y: "50%", opacity: 0, transition },
    enter: {
      y: "0%",
      opacity: 1,
      delay: -1,
      transition
    }
  };
  return (
    <StyledApp>
      <div className="page-logo">
        <Logo />
      </div>
      <AuthContainer>
        <AnimatePresence exitBeforeEnter initial={true}>
          <motion.div
            className="Text-container"
            initial="exit"
            animate="enter"
            exit="exit"
          >
            <MotionAuthContent variants={imageVariants}>
              {showRegister ? (
                <AuthForm
                  buttonText="Get Started"
                  register
                  onSubmit={register}
                  registerClick={handleRegisterClick}
                />
              ) : (
                <AuthForm
                  buttonText="Login"
                  onSubmit={login}
                  registerClick={handleRegisterClick}
                />
              )}
            </MotionAuthContent>
          </motion.div>
        </AnimatePresence>

        <div className="Doddle-container">
          <AuthDoddle />
        </div>
      </AuthContainer>
    </StyledApp>
  );
}

const StyledApp = styled.div`
  font-family: ${theme.fonts.Nunito};
  position: relative;

  .page-logo{
    position: absolute;
    top: 2rem;
    left: 2rem;
  }
`

const AuthContainer = styled.div`
  ${mixin.flexBetween};
  height: 100vh;
  ${media.phablet`justify-content: center;`}

  .Doddle-container{
    width: 50%;
    height: 100%;
    ${mixin.flexCenter};
    background-color: ${theme.colors.tertiary};

    & svg{
      height: 100%;
    }
    ${media.phablet`display: none`}
  }

  .Text-container{
    width: 50%;
    ${media.phablet`width: 100%`}
  }
`;

const AuthContent = styled.div`
  width: 60%;
  margin: 0 auto;

  ${media.phone`width: 90%`}
`;

export default UnAuthenticatedApp;
