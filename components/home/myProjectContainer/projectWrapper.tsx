import Link from 'next/link'

import { IProjectInfo } from './myBlog'

interface ProjectWrapperProps {
  projectInfo: IProjectInfo
  children: React.ReactNode
}

const ProjectWrapper = ({ projectInfo, children }: ProjectWrapperProps) => {
  return (
    <div className='border border-slate-400 w-full py-4 px-2 text-center space-y-8 shadow-md rounded-md'>
      <div className='space-y-4 px-4 py-2 h-full border border-slate-400 rounded-md shadow-md'>
        <div className='flex items-center px-4 py-2 justify-between text-sm md:text-xl font-bold text-gray-700'>
          <div className='flex text-slate-400 space-x-8'>
            <span>{projectInfo.title}</span>
            <span>{projectInfo.date}</span>
          </div>

          <Link href={projectInfo.git} passHref>
            <a target='_blank' rel='noopener noreferrer'>
              <svg
                className='w-6 h-6 fill-slate-400 hover:scale-105 transition'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
              >
                <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
              </svg>
            </a>
          </Link>
        </div>

        <div className='h-full flex flex-col space-y-8 p-4'>{children}</div>
      </div>
    </div>
  )
}

export default ProjectWrapper
