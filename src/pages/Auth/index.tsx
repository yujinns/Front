import { Input } from 'components/Input'
import { ChangeEvent, useState } from 'react'
import './style.css'


export default function Auth() {
const [error, setError] = useState<boolean>(false)
const [email, setEmail] = useState<string>('')
const [password, setPassword] = useState<string>('')


  return (
    <div id='auth'>
      <div className="auth-container">
        <div className="auth-card-box">
          <div className='auth-card-title'>로그인</div>
          <div className='auth-card-input-box'>
            <Input label='이메일' placeholder='이메일을 입력하세요.' type='text' error={error} value={''} onChange={function (e: ChangeEvent<HTMLInputElement>): void {
            throw new Error('Function not implemented.')
            } } />
            <Input label='비밀번호' placeholder='비밀번호를 입력하세요.' type='password' error={error} value={''} onChange={function (e: ChangeEvent<HTMLInputElement>): void {
              throw new Error('Function not implemented.')
            } } />
          </div>
        </div>
      </div>
    </div>
  )
}
