import  { FC, ReactNode} from 'react';

interface LayoutProps {
    children: ReactNode
}
const Layout:FC<LayoutProps> = ({ children }) => {
    return ( 
        <div className='bg-red-500'>{children}</div>
     );
}
 
export default Layout;