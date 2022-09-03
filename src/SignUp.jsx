import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import {useAuth}  from './context/useAuth';

function SignUp() {


    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const user = useAuth();

    const onSubmit = data => {
      console.log(data);
      if(data.password !== data.repassword){
        alert("密碼不相同");
        return false;
      }


      user.signup(data);

    }


  return (
    <div id="signUpPage" className="bg-yellow">
    <div className="container signUpPage vhContainer">
        <div className="side">
            <a href="#"><img className="logoImg" src="https://upload.cc/i1/2022/03/23/rhefZ3.png" alt="" /></a>
            <img className="d-m-n" src="https://upload.cc/i1/2022/03/23/tj3Bdk.png" alt="workImg" />
        </div>
        <div>
        <form className="formControls"  onSubmit={handleSubmit(onSubmit)}>
                <h2 className="formControls_txt">註冊帳號</h2>
                <label className="formControls_label" htmlFor="email">Email</label>
                   {/* register your input into the hook by invoking the "register" function */}
                   <input className="formControls_input" placeholder="請輸入 email" type="email" id="email" {...register("email", { required: true})} />
                    {errors.email?.type === 'required' && <span>此欄位不可留空</span>}
                <label className="formControls_label" htmlFor="name">您的暱稱</label>
                                   {/* register your input into the hook by invoking the "register" function */}
                                   <input className="formControls_input" placeholder="請輸入您的暱稱" type="text"  id="name"{...register("nickname", { required: true})} />
                    {errors.nickname?.type === 'required' && <span>此欄位不可留空</span>}
                <label className="formControls_label" htmlFor="pwd">密碼</label>
                <input className="formControls_input" placeholder="請輸入密碼" type="password" id="pwd" {...register("password", { required: true})} />
                {errors.password?.type === 'required' && <span>此欄位不可留空</span>}
                <label className="formControls_label" htmlFor="pwd">再次輸入密碼</label>
                <input className="formControls_input" placeholder="請再次輸入密碼" type="password" id="repwd" {...register("repassword", { required: true})} />
                    {errors.repassword?.type === 'required' && <span>此欄位不可留空</span>}
                <input className="formControls_btnSubmit" type="submit" value="註冊帳號" />
                <Link className="formControls_btnLink" to="/">登入</Link>
            </form>
        </div>
    </div>

</div>
  )
}

export default SignUp