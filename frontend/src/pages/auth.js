import React from "react";
import * as Components from "../components/ui/Component";
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [signIn, toggle] = React.useState(true);
  const navigate = useNavigate();

  const handleSignUp = (event) => {
    event.preventDefault();
    // Handle sign-up logic here (e.g., validation, API call)
    console.log("User signed up");
    navigate('/home'); // Navigate to the home page
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    // Handle sign-in logic here (e.g., authentication, API call)
    console.log("User signed in");
    navigate('/home'); // Navigate to a dashboard or home page
  };

  return (
    <Components.Wrapper>
      <Components.Container>
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form onSubmit={handleSignUp}>
            <Components.Title>Create Account</Components.Title>
            <Components.Input type="text" placeholder="Name" />
            <Components.Input type="email" placeholder="Email" />
            <Components.Input type="password" placeholder="Password" />
            <Components.Button>Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn={signIn}>
          <Components.Form onSubmit={handleSignIn}>
            <Components.Title>Sign in</Components.Title>
            <Components.Input type="email" placeholder="Email" />
            <Components.Input type="password" placeholder="Password" />
            <Components.Anchor href="#">
              Forgot your password?
            </Components.Anchor>
            <Components.Button>Sigin In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>
            <Components.LeftOverlayPanel signinIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signinIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter Your personal details and start journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Sigin Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </Components.Wrapper>
  );
};

export default Auth;
