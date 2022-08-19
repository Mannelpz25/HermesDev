import React from 'react'
import { useSelector} from "react-redux"
import { NotesLayout } from '../layout/NotesLayout';
import { NothingSelectedView } from '../views/NothingSelectedView';
import { WorkspaceView } from '../views/workspaceView';


export const NotesPage = () => {    
   
    const{notes, activeWorkspace} = useSelector( state => state.notes); 
    
    return (
    <NotesLayout>
        {
        (!!activeWorkspace)
        ? <WorkspaceView />
        : <NothingSelectedView />
        }
        
        
        
    </NotesLayout>
  )
}
