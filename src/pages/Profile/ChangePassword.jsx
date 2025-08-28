import { useState } from "react";
import ProfileLayout from "../../layout/ProfileLayout";
import { useChangePasswordMutation } from "../../redux/features/auth/authApi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [handleChangePassword] = useChangePasswordMutation();

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async ({ password, newPassword, newPasswordConfirm }) => {
    const payload = {
      oldPassword: password,
      password: newPassword,
      passVerify: newPasswordConfirm,
    };

    const res = await handleChangePassword(payload).unwrap();
    if (res.success) {
      localStorage.removeItem("changePassword");
      toast.success(res?.result?.message);
      navigate("/");
    } else {
      toast.error(res?.error?.errorMessage);
    }
  };
  return (
    <ProfileLayout>
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade active show"
          id="pills-change-pass"
          role="tabpanel"
          aria-labelledby="pills-change-pass-tab"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            data-v-74a6c3ae
            className="profile-change-password-sec"
          >
            <div data-v-74a6c3ae className="change-group">
              <input
                {...register("password", { required: true })}
                data-v-74a6c3ae
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Current Password*"
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                data-v-74a6c3ae
                className="showHide-pass noLabel"
                style={{ cursor: "pointer" }}
              >
                {showPassword ? (
                  <img
                    data-v-39abe11c
                    loading="lazy"
                    src="/icon/eye.caf8dd05.svg"
                    alt=""
                  />
                ) : (
                  <img
                    data-v-39abe11c
                    loading="lazy"
                    src="/icon/eye-slash.2aa08859.svg"
                    alt=""
                  />
                )}
              </div>
              {/**/}
            </div>
            <div data-v-74a6c3ae className="change-group">
              <input
                {...register("newPassword", {
                  required: true,
                })}
                data-v-74a6c3ae
                type={!showNewPass ? "password" : "text"}
                maxLength={20}
                className="form-control"
                placeholder="New Password*"
              />
              <div
                onClick={() => setShowNewPass((prev) => !prev)}
                style={{ cursor: "pointer" }}
                data-v-74a6c3ae
                className="showHide-pass noLabel"
              >
                {showNewPass ? (
                  <img
                    data-v-39abe11c
                    loading="lazy"
                    src="/icon/eye.caf8dd05.svg"
                    alt=""
                  />
                ) : (
                  <img
                    data-v-39abe11c
                    loading="lazy"
                    src="/icon/eye-slash.2aa08859.svg"
                    alt=""
                  />
                )}
              </div>
              {/**/}
            </div>
            <div data-v-74a6c3ae className="change-group">
              <input
                {...register("newPasswordConfirm", {
                  required: true,
                })}
                data-v-74a6c3ae
                type={!showConfirmPass ? "password" : "text"}
                maxLength={20}
                placeholder="Confirm New Password*"
                className="form-control"
              />
              <div
                style={{ cursor: "pointer" }}
                onClick={() => setShowConfirmPass((prev) => !prev)}
                data-v-74a6c3ae
                className="showHide-pass noLabel"
              >
                {showConfirmPass ? (
                  <img
                    data-v-39abe11c
                    loading="lazy"
                    src="/icon/eye.caf8dd05.svg"
                    alt=""
                  />
                ) : (
                  <img
                    data-v-39abe11c
                    loading="lazy"
                    src="/icon/eye-slash.2aa08859.svg"
                    alt=""
                  />
                )}
              </div>
              {/**/}
            </div>
            {/* <div data-v-74a6c3ae className="feedback password-lft">
              <span data-v-74a6c3ae>
                <b data-v-74a6c3ae>Note: </b>
                <br data-v-74a6c3ae /> • Password Must Be Of Minimum 8
                Characters And Maximum 20 Characters.
              </span>{" "}
              <br data-v-74a6c3ae />
              <span data-v-74a6c3ae>
                • Password Must Contain Alphabets, Numbers, special characters
                And At Least 1 In Capital Case, And 1 In Lower Case.
              </span>
            </div> */}
            <div data-v-74a6c3ae className="stack-save-btn">
              <button data-v-74a6c3ae type="submit">
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default ChangePassword;
