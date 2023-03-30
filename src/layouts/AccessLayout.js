import { useContext } from 'react';
import { AuthContext } from '../helpers/auth';

export default function AccessLayout({ children, skeleton }) {
  const context = useContext(AuthContext);
  return context?.user ? children : skeleton;
}
