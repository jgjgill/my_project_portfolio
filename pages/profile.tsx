import Button from '@components/button';
import Input from '@components/input';
import useMutation from '@libs/client/useMutation';
import { profile } from 'console';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { UserResponse } from './study/[id]';

interface NicknameForm {
  nickname: string;
}

const Profile: NextPage = () => {
  const { data: user, mutate: nicknameMutate } =
    useSWR<UserResponse>('/api/users/me');
  const [nicknameChange, { loading }] = useMutation('/api/profile');

  const {
    register: nicknameRegister,
    handleSubmit: nicknameSubmit,
    formState: { errors: nicknameErrors },
    reset: nicknameReset,
  } = useForm<NicknameForm>();

  const nicknameValid = (nicknameForm: NicknameForm) => {
    console.log(nicknameForm);
    nicknameChange(nicknameForm);
    nicknameMutate(
      (prev) =>
        prev && {
          ...prev,
          profile: {
            ...prev.profile,
            name: nicknameForm.nickname,
          },
        },
      false
    );
    nicknameReset();
  };

  console.log(user);

  return (
    <div className="bg-slate-200 px-2 py-2 space-y-2 rounded-md shadow-md">
      <div className="text-xl font-bold text-slate-700">Profile</div>
      <div>{user?.profile.name}</div>
      <form
        onSubmit={nicknameSubmit(nicknameValid)}
        className="flex flex-col space-y-2 items-center"
      >
        <Input
          label="Nickname"
          name="nickname"
          type="text"
          placeholder="Nickname Change"
          register={nicknameRegister('nickname', { required: true })}
          required
        />
        <Button text="Enter" loading={false} />
      </form>
    </div>
  );
};

export default Profile;