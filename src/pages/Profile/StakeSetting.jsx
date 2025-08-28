import { useNavigate } from "react-router-dom";
import ProfileLayout from "../../layout/ProfileLayout";
import { useEditButtonValuesMutation } from "../../redux/features/events/events";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const StakeSetting = () => {
  const [editButtonValue] = useEditButtonValuesMutation();
  const navigate = useNavigate();
  const stakes = JSON.parse(localStorage.getItem("buttonValue"));
  const { handleSubmit, register, watch } = useForm({
    defaultValues: {
      buttonGameValues: stakes,
    },
  });

  const buttonGameValues = watch("buttonGameValues");

  const onSubmit = async () => {
    const payload = {
      game: buttonGameValues?.map((btn) => ({
        label: parseFloat(btn?.value),
        value: parseFloat(btn?.value),
      })),
    };

    const res = await editButtonValue(payload).unwrap();
    if (res.success) {
      toast.success(res?.result?.message);
      localStorage.removeItem("buttonValue");
      const gameButtonsValues = buttonGameValues;
      localStorage.setItem("buttonValue", JSON.stringify(gameButtonsValues));
      navigate("/");
    }
  };

  return (
    <ProfileLayout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="tab-content"
        id="pills-tabContent"
      >
        <div
          className="tab-pane fade active show"
          id="pills-stake-setting"
          role="tabpanel"
          aria-labelledby="pills-stake-setting-tab"
        >
          <div className="profile-stack-section">
            <div className="app-stack-setting-section">
              {stakes?.map((stake, idx) => {
                return (
                  <div key={idx} className="stack-inpt-group">
                    <span className="addnum">
                      <b>{stake?.value}</b>
                    </span>
                    <input
                      {...register(`buttonGameValues.${idx}.value`)}
                      className="form-control"
                      type="tel"
                      maxLength={8}
                    />
                  </div>
                );
              })}
            </div>
            <div className="stack-save-btn">
              <button type="submit">Save</button>
            </div>
          </div>
        </div>
      </form>
    </ProfileLayout>
  );
};

export default StakeSetting;
