import AuthDoddle from 'assets/AuthDoddle';
import Logo from 'assets/Logo';
import AuthForm from 'components/Form';
import styled from 'styled-components';
import { media, mixin, theme } from 'styles';

function App() {
  return (
    <StyledApp>
      <div className="page-logo"><Logo /></div>
      <AuthContainer>
        <div className="Text-container">
          <RegisterContainer>
            <AuthForm buttonText="Get Started"/>
          </RegisterContainer>
        </div>
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

const RegisterContainer = styled.div`
  width: 60%;
  margin: 0 auto;

  ${media.phone`width: 90%`}
`;

export default App;
