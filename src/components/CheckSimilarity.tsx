'use client'

import { FC } from 'react'
import LargeHeading from './ui/LargeHeading'
import Paragraph from './ui/Paragraph'
import { useState } from 'react'
import { User } from '@prisma/client'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import InputOther from './ui/InputOther'
import Button from './ui/Button'
import axios from 'axios'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

interface CheckSimilarityProps {
  user?: User
}

const CheckSimilarity: FC<CheckSimilarityProps> = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [correct, setCorrect] = useState()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      firstText: '',
      secondText: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true)
      console.log(data)
      const res = await axios.post('/api/v1/check', data)
      console.log(res)
      setCorrect(res?.data.percentage)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(true)
    }
  }

  return (
    <div className='flex flex-col gap-6 ml-10'>
      <LargeHeading className='text-3xl'>
        Welcome back, {user?.name}
      </LargeHeading>
      <LargeHeading className='text-2xl'>Check Text Similarity</LargeHeading>
      <div className='w-[60%] h-auto flex flex-col mx-auto'>
        <div className='flex gap-4 items-center'>
          <Paragraph className='w-[150px] text-xl font-semibold'>
            First text:
          </Paragraph>
          <InputOther
            id='firstText'
            label='FirstText'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
        <div className='flex gap-4 mt-5'>
          <Paragraph className='w-[150px] text-xl font-bold'>
            Second text:
          </Paragraph>
          <InputOther
            id='secondText'
            label='SecondText'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
        <Button className='w-full mt-5' onClick={handleSubmit(onSubmit)}>
          Check
        </Button>
        <div className='flex flex-col h-[300px] w-[300px] mt-10 mx-auto'>
          {correct && (
            <>
              <LargeHeading className='text-3xl mb-5'>Result</LargeHeading>
              <CircularProgressbar
                className='mb-10'
                value={correct}
                text={`${correct}%`}
                styles={buildStyles({
                  textColor: 'white',
                  pathColor: 'green',
                  trailColor: 'red',
                })}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CheckSimilarity
