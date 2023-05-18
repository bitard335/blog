import Header from '../header/header';
import AuthProvider from '../../hoc/AuthProvider';

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Header />
      </AuthProvider>
    </div>
  );
};

export default App;
