import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useUpdateUser } from '../../api/user'
import { Button } from '../../components/Button'
import FormCard from '../../components/forms/FormCard'
import Input from '../../components/forms/Input'
import { email, url } from '../../components/forms/validators'
import { useAuth } from '../../lib/auth'

type FormValues = {
  name: string
  email: string
  photoURL?: string
}

const PersonalInfoForm = ({ id }: { id: string }) => {
  const { user } = useAuth()
  const [saved, setSaved] = useState(false)
  const { mutateAsync } = useUpdateUser()
  const { register, handleSubmit, formState } = useForm<FormValues>()
  const { errors, isSubmitting, isSubmitSuccessful } = formState

  const onSubmit = handleSubmit((data) => {
    return mutateAsync(data)
      .then(() => setSaved(true))
      .catch(() => setSaved(false))
  })

  return (
    <FormCard
      id={id}
      title="Personal information"
      isSubmitting={isSubmitting}
      isSubmitSuccess={saved && isSubmitSuccessful}
      isSubmitFail={!saved && isSubmitSuccessful}
      onSubmit={onSubmit}
    >
      <FormCard.Content>
        <Input
          {...register('name', { required: 'A full name is required' })}
          label="Full name"
          autoComplete="name"
          defaultValue={user?.name}
          error={errors.name?.message}
        />
        <Input
          {...register('email', { required: 'An email address is required', validate: email })}
          label="Email address"
          autoComplete="email"
          defaultValue={user?.email}
          error={errors.email?.message}
        />
        <Input
          {...register('photoURL', { validate: url })}
          label="Photo URL"
          defaultValue={user?.photoURL}
          error={errors.photoURL?.message}
          optional
        />
      </FormCard.Content>
      <FormCard.Actions>
        <Button onClick={console.log} secondary>
          Reset defaults
        </Button>
        <Button type="submit" primary>
          Save
        </Button>
      </FormCard.Actions>
    </FormCard>
  )
}

export default PersonalInfoForm