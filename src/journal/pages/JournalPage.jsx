
import { AddOutlined } from "@mui/icons-material"
import { JournalLayout } from "../layout/JournalLayout"
import { NothingSelectedView } from "../view/NothingSelectedView"
import { IconButton } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../store/journal/thunks"
import { NoteView } from "../view/NoteView"

export const JournalPage = () => {

  const dispatch = useDispatch();
  const { isSaving, active } = useSelector(state => state.journal);

  // Si el status cambia se devuelve el nuevo valor, sino se mantiene el mismo
  // const isSaving = useMemo(() => status === true, [status]);

  const onClickNewNote = () => {

    dispatch(startNewNote());

  }


  return (
    <JournalLayout>


      {
          (!!active)
          ? <NoteView />
          : <NothingSelectedView />
      }

      <IconButton
        onClick={onClickNewNote}
        size='large'
        disabled={isSaving}
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >

        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>

      {/* <NoteView/> */}
    </JournalLayout>
  )
}
