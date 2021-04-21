import {Switch, Route, Redirect } from 'react-router-dom'
import Select from "./pages/SelectContest";
import Create from "./pages/CreateContest";
import Contest from "./pages/Contest";
import Committee from "./pages/Committee";


export const useRotes = ()=>{

    return(
        <Switch>
            <Route path='/' exact>
                <Select/>
            </Route>
            <Route path='/create'>
                <Create/>
            </Route>
            <Route path='/contest/:id'>
                <Contest/>
            </Route>
            <Route path='/committee'>
                <Committee/>
            </Route>

            <Redirect to='/'/>
        </Switch>
    )
}