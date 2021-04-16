import {Switch, Route, Redirect } from 'react-router-dom'
import SelectPage from "./pages/SelectPage";
import CreatePage from "./pages/CreatePage";
import ContestPage from "./pages/ContestPage";


export const useRotes = ()=>{

    return(
        <Switch>
            <Route path='/' exact>
                <SelectPage/>
            </Route>
            <Route path='/create'>
                <CreatePage/>
            </Route>
            <Route path='/contest/:id'>
                <ContestPage/>
            </Route>

            <Redirect to='/'/>
        </Switch>
    )
}