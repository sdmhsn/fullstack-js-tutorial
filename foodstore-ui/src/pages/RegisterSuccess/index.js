import React from 'react';

import { LayoutOne, Card, Text, Button } from 'upkit';

// import { Link } from 'react-router-dom';
import { Link } from 'react-router-dom';

// We can't use export default statement before const arrow function like this. This <RegisterSuccess> component is writing by arrow function.
export const RegisterSuccess = () => {
  return (
    <LayoutOne size="small">
      <Card color="white">
        <div className="text-center">
          <Text as="h3">Registration Successful</Text>
          <Text>Please login to access the website</Text>

          <br />

          <Link to="/login">
            <Button fitContainer>Login</Button>
          </Link>
        </div>
      </Card>
    </LayoutOne>
  );
};

// export default RegisterSuccess; // We can only use export default on arrow function by write it on the below of the arrow function. and the imported name in App.js should write not inside curly braces {}
