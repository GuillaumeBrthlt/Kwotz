import SoftBox from '@components/SoftBox'
import SoftButton from '@components/SoftButton'
import SoftInput from '@components/SoftInput'
import SoftTypography from '@components/SoftTypography'
import { useProjectStore } from '@contexts/ProjectContext'
import { Card } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React, {useState} from 'react'
import { useEffect } from 'react'

export const CommentSection = observer(({ comment, projectId }) => {
  const [newComment, setNewComment] = useState('')
  const projectStore = useProjectStore()

  useEffect(() => {
    if (comment) {
      setNewComment(comment)
    }
  }, [comment])

  function handleSubmit() {
    const payload= {
      project: {
        message: newComment
      }
    }
    projectStore.updateProject(projectId, payload)
  }

  return (
    <SoftBox>
      <Card >
        <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
          <SoftBox lineHeight={1}>
            <SoftTypography variant="h5" fontWeight="medium">
              Ajouter un commentaire au projet
            </SoftTypography>
            <SoftTypography variant="button" fontWeight="regular" color="text">
              Message à destination du fournisseur
            </SoftTypography>
          </SoftBox>
        </SoftBox>
        <SoftBox p={2}>
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
            variant="gradient"
            onClick={() => {handleSubmit()}}
          >
            Enregister
          </SoftButton>
        </SoftBox> 
      </Card>
    </SoftBox>
    
  )
})
