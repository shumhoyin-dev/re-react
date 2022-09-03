import {useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from './context/useAuth'
import { useForm } from "react-hook-form";

function LoginPage() {
  const user = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {
    user.login(data);
  }
  return (
    <div id="loginPage" className="bg-yellow">
        <div className="container loginPage vhContainer">
            <div className="side">
                <a href="#">
                  <img className="logoImg" src="https://upload.cc/i1/2022/03/23/rhefZ3.png" alt="" /></a>
                  <img className="d-m-n" src="https://upload.cc/i1/2022/03/23/tj3Bdk.png" alt="workImg" />
            </div>
            <div>  
                <form className="formControls"  onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
                    <label className="formControls_label" htmlFor="email">Email</label>
                     {/* register your input into the hook by invoking the "register" function */}
                    {/* <input  {...register("email")} className="formControls_input" type="text" id="email" name="email" laceholder="請輸入 email" required />
                     */} 
                      {/* register your input into the hook by invoking the "register" function */}
                    <input className="formControls_input" placeholder="請輸入 email" type="email" id="email" {...register("email", { required: true})} />
                    {errors.email?.type === 'required' && <span>此欄位不可留空</span>}

                    <label className="formControls_label" htmlFor="pwd">密碼</label>
                    <input className="formControls_input" placeholder="請輸入密碼" type="password" id="pwd" {...register("password", { required: true})} />
                    {errors.password?.type === 'required' && <span>此欄位不可留空</span>}

                    <input className="formControls_btnSubmit" type="submit" value="登入" />
                    <Link to="/signup" className="formControls_btnLink">註冊帳號</Link>
                </form>
            </div>
        </div>
    </div>
  )
}

export default LoginPage