import SoftBox from '@components/SoftBox'
import SoftButton from '@components/SoftButton'
import SoftInput from '@components/SoftInput'
import SoftTypography from '@components/SoftTypography'
import { useProjectStore } from '@contexts/ProjectContext'
import { Card } from '@mui/material'
import React, {useState} from 'react'

export default function CommentSection({ comment, projectId }) {
  const [newComment, setNewComment] = useState(comment)
  const projectStore = useProjectStore()

  function handleSubmit() {
    const payload= {
      project: {
        message: newComment
      }
    }
    projectStore.updateProject(projectId, payload)
  }


  return (
    <SoftBox mt={3}>
      <Card >
        <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
          <SoftBox lineHeight={1}>
            <SoftTypography variant="h5" fontWeight="medium">
              Ajouter un commentaire au projet
            </SoftTypography>
          </SoftBox>
        </SoftBox>
        <SoftBox p={3}>
          <SoftInput
            multiline
            rows={5}
            value={newComment}
            onChange={(e) => {setNewComment(e.target.value)}}
          >
          </SoftInput>
        </SoftBox>
        <SoftBox textAlign='center' mb={2}>
          <SoftButton
            color="info"
            onClick={() => {handleSubmit()}}
          >
            Enregister
          </SoftButton>
        </SoftBox> 
      </Card>
    </SoftBox>
    
  )
}
