import { useForm } from 'react-hook-form'
import { useState, useRef } from 'react'
import { useClickAway } from 'react-use'

import ProjectDevelopmentLogList from './projectDevelopmentLogList'
import { IProjectDevelopmentLogParagraph } from './myBlog'
import Button from '@components/common/button'
import CloseIcon from 'assets/svgs/common/closeIcon'

interface ProjectDevelopmentLogProps {
  logList: IProjectDevelopmentLogParagraph[]
}

const ProjectDevelopmentLog = ({ logList }: ProjectDevelopmentLogProps) => {
  const [showDevelopmentLog, setShowDevelopmentLog] = useState(false)

  const logRef = useRef(null)

  const { handleSubmit: developSubmit } = useForm()

  const developValid = () => {
    setShowDevelopmentLog((prev) => !prev)
  }

  const onToggleDevelopmentLog = () => {
    setShowDevelopmentLog((prev) => !prev)
  }

  useClickAway(logRef, () => {
    if (!showDevelopmentLog) return

    setShowDevelopmentLog((prev) => !prev)
  })

  return (
    <div ref={logRef}>
      <form onSubmit={developSubmit(developValid)}>
        <Button text='Development Log' loading={false} />
      </form>

      {showDevelopmentLog && (
        <div className='fixed overflow-y-auto top-20 left-10 right-10 bottom-10 px-2 py-8 bg-slate-800 rounded-md shadow-md'>
          <h1 className='absolute top-0 left-1/2 -translate-x-1/2 p-1 text-2xl font-semibold text-slate-50'>
            개발일지
          </h1>

          <button type='button' className='absolute right-0 top-0 p-1 cursor-pointer' onClick={onToggleDevelopmentLog}>
            <CloseIcon className='w-6 h-6 stroke-slate-50 hover:scale-105 transition' />
          </button>

          <ProjectDevelopmentLogList logList={logList} />
        </div>
      )}
    </div>
  )
}

export default ProjectDevelopmentLog
