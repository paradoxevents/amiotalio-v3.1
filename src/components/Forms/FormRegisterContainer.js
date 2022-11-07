// st-lib & utils
import React, { useState, useEffect } from "react"
import { useFormik } from "formik"
import { Link } from "gatsby"
import { sleep } from "../../utils/helpers"
import { cacheRegistrationData, clearFormCache } from "../../utils/storage"

// MUI
import Box from "@mui/material/Box"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"

// Components
import Button from "../Page/Button"
import Loading from "../Loading"

// Containers
import FormRegisterStepOne from "./FormRegisterStepOne"
import FormRegisterStepTwo from "./FormRegisterStepTwo"
import FormRegisterStepThree from "./FormRegisterStepThree"
import FormRegisterStepFour from "./FormRegisterStepFour"

// Form Schema
import { RegisterSchema } from "./ValidationSchema"
import { formSteps } from "./RegisterInitialValues"

// API
import { registerUser } from "../../api/registerUser"
import { useAppContext } from "../../context/AppContext"
import { useUserContext } from "../../context/UserContext"
import StepContainer from "./StepContainer"

const { log } = console

const FormRegisterContainer = ({ initialValues }) => {
  const { isLoading, setLoading } = useAppContext()
  const [activeStep, setActiveStep] = useState(0)
  const [formError, setFormError] = useState("")
  const [currentEmail, setCurrentEmail] = useState("")
  const [isSuccess, setSuccess] = useState(false)
  const [isUserRegistered, setUserRegistered] = useState(false)
  const { user, setUser } = useUserContext()

  useEffect(() => {
    if (!user) return
    if (!user.active) setActiveStep(1)
  }, [])

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: RegisterSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async values => {},
  })

  const handleCheckbox = async ({ target }) => {
    const { name } = target
    const {
      setFieldValue,
      setFieldTouched,
      validateField,
      setFieldError,
      values,
    } = formik
    await setFieldValue(name, !values[name], false)

    if (
      name === "learnExpand" ||
      name === "learnBusiness" ||
      name === "learnTrade" ||
      name === "learnCryptoInvest" ||
      name === "learnCrypto" ||
      name === "learnCryptoNew"
    ) {
      await setFieldValue(name, !values[name], false)
      setFieldError("isLearnChecked", false)
      await validateField("isLearnChecked")
    } else {
      await setFieldValue(name, !values[name], false)
      await setFieldTouched(name, true, false)
      await validateField(name)
    }
  }

  const handleBlur = async fieldName => {
    const { values, validateField, setFieldTouched } = formik

    setFieldTouched(fieldName, true, false)

    if (fieldName === "email") {
      const { email } = values

      if (email === "") {
        validateField("email")
        return
      } else {
        if (currentEmail === email) return

        setCurrentEmail(email)
      }
    }

    validateField(fieldName)

    // console.log('cache form')
    // cacheRegistrationData(values)
  }

  const handleBack = () => setActiveStep(prevActiveStep => prevActiveStep - 1)

  const handleNext = async e => {
    e.preventDefault()
    const { errors, touched, values } = formik

    setLoading(true)
    setFormError("")

    let valid = false

    if (activeStep === 0) valid = await validateStepOne()
    // if (activeStep === 1) valid = await validateStepTwo()
    // if (activeStep === 1) valid = await validateStepThree()
    // if (activeStep === 1) valid = await validateStepFour()

    // mock API timeout
    // if not used 'next' btn allows to go through on pending Promise in validationStepOne()
    await sleep(1000)

    if (!valid) {
      setLoading(false)
      return
    }

    // register new user
    if (activeStep === 0 && valid) {
      let newUser = await registerUser(formik.values)
      if (newUser.errors) {
        console.log(newUser)
        setFormError(newUser.errors.email[0])
        setLoading(false)
        return
      } else {
        setUser(newUser.data.user)
        setUserRegistered(true)
      }
    }

    setLoading(false)

    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const validateStepOne = () =>
    new Promise(async (resolve, reject) => {
      const { errors, touched, setFieldTouched, validateField } = formik

      // imperativaly set all current step fields as touched to display errors for required fields
      await setFieldTouched("agreePrivacy", true, false)
      await setFieldTouched("email", true, false)
      await setFieldTouched("password", true, false)
      await setFieldTouched("passwordConfirm", true, false)

      // temporary fix for double click on next btn isLoading state update
      await sleep(1000)

      validateField("agreePrivacy")
      validateField("email")
      validateField("password")
      validateField("passwordConfirm")

      const isAgreePrivacyValid = Boolean(
        !errors.agreePrivacy && touched.agreePrivacy
      )
      const isEmailValid = Boolean(!errors.email && touched.email)
      const isPasswordValid = Boolean(!errors.password && touched.password)
      const isConfirmPasswordValid = Boolean(
        !errors.passwordConfirm && touched.passwordConfirm
      )

      const isStepValid =
        isPasswordValid &&
        isAgreePrivacyValid &&
        isEmailValid &&
        isConfirmPasswordValid

      if (!isStepValid) return reject(false)

      return resolve(true)
    })

  const validateStepThree = async () =>
    new Promise(async resolve => {
      const { errors, touched, setFieldTouched, validateField } = formik

      // imperatively set all current step fields as touched to display errors for required fields
      await setFieldTouched("password", true, false)
      await setFieldTouched("passwordConfirm", true, false)

      validateField("password")
      validateField("passwordConfirm")

      const isPasswordValid = Boolean(!errors.password && touched.password)
      const isPasswordConfirmValid = Boolean(
        !errors.passwordConfirm && touched.passwordConfirm
      )

      const isStepValid = isPasswordValid && isPasswordConfirmValid

      if (isStepValid) resolve(true)
      else resolve(false)
    })

  return (
    <>
      <div className="form-box">
        <form onSubmit={formik.handleSubmit}>
          <Stepper activeStep={activeStep}>
            {formSteps.map(label => {
              const stepProps = {}
              const labelProps = {}

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel
                    {...labelProps}
                    sx={{
                      "& .MuiStepIcon-root": {
                        color: "#21374A",
                      },
                      "& .MuiStepIcon-root.Mui-active": {
                        color: "#f1b307",
                      },
                      "& .MuiStepIcon-root.Mui-active .MuiStepIcon-text": {
                        fill: "#21374A",
                      },
                      "& .MuiStepIcon-root.Mui-completed": {
                        color: "#BB9A3F",
                      },
                    }}
                  />
                </Step>
              )
            })}
          </Stepper>

          <h5 className="form-step-label-step">
            {activeStep <= 1 ? `Step ${activeStep + 1}` : ""}
          </h5>
          <h3 className="form-step-label">{formSteps[activeStep]}</h3>

          <FormRegisterStepOne
            show={activeStep === 0}
            handleBlur={handleBlur}
            handleCheckbox={handleCheckbox}
            formik={formik}
          />

          <FormRegisterStepFour
            show={activeStep === 1}
            handleBlur={handleBlur}
            handleCheckbox={handleCheckbox}
            setSuccess={setSuccess}
            setActiveStep={setActiveStep}
            activeStep={activeStep}
          />

          <FormStepSuccess show={activeStep === 2} isSuccess={isSuccess} />

          {activeStep < 1 && (
            <>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                {activeStep !== 0 && (
                  <Button
                    small
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    customClass="btn-back"
                  >
                    Back
                  </Button>
                )}
                <Box sx={{ flex: "1 1 auto" }} />

                <Button
                  small
                  onClick={handleNext}
                  type="button"
                  disabled={isLoading}
                >
                  Next
                </Button>
              </Box>
              <Loading errorMessage={formError} label={"Processing form..."} />
            </>
          )}
        </form>
      </div>
      <div className="register-link">
        Already have an account? <Link to="/login">Log in here</Link>.
      </div>
    </>
  )
}

export default FormRegisterContainer

const FormStepSuccess = ({ show }) => {
  return (
    <StepContainer show={show}>
      <h3 className="text-center">Congratulations!</h3>
      <p className="form-success-message">Your payment has been successful.</p>

      <p className="form-success-message">
        You did it. <br />
        You are now one part of the ATU community. We have a big plans for this
        year and we are glad you are part of it.
      </p>

      <p className="text-center">
        When you login, go join Telegram and Discord groups and catch up with
        the previous content.
      </p>

      <p className="text-center">
        You can now head to <Link to="/login">login page</Link> to access{" "}
        <strong>Members Area</strong>.
        <br />
        <br />
        Enjoy!
      </p>
    </StepContainer>
  )
}
