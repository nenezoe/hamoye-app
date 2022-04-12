
import DashboardTable from './Pages/Dashboard';
import Unauthenticated from './Pages/Unauthenticated/index';

const Pages = () => {
   const isAuthenticated  = false
   return(
       <>
           { isAuthenticated ? <DashboardTable /> : <Unauthenticated /> }
       </>
   )
}

export default Pages