/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { Formik, Form } from "formik";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftButton from "@components/SoftButton";

// NewProduct page components
import Informations from "@components/NewSparePart/components/Informations";

import validations from "@components/NewSparePart/schemas/validations";
import initialValues from "@components/NewSparePart/schemas/initialValues";
import form from "@components/NewSparePart/schemas/form"
import { useColdRoomStore } from "@contexts/ColdRoomContext";



function NewSparePart({project, handleCloseSparePart}) {
  const { formId, formField } = form;
  const currentValidation = validations[0];
  const coldRoomStore = useColdRoomStore()


  function handleSubmit(values, actions) {
    const payload = {
      spare_part: {
        name: values.SPname,
        brand: values.brand,
        reference: values.reference,
        quantity: values.quantity,
        details: values.details,
        project_id: project
      },
    }
    actions.setTouched({})
    coldRoomStore.createSparePart(payload)
    handleCloseSparePart()
  }

  return (
      <SoftBox mt={1}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={12}>
            <Formik
              initialValues={initialValues}
              validationSchema={currentValidation}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, isSubmitting }) => (
                <Form id={formId} autoComplete="off">
                  <Card sx={{ overflow: "visible" }}>
                    <SoftBox p={2}>
                      <SoftBox>
                        <Informations formData={{values, errors, touched, formField}}/>
                        <SoftBox mt={3} width="100%" display="flex" justifyContent="space-between">
                          <SoftButton variant="gradient" color="secondary" onClick={handleCloseSparePart}>
                            Annuler
                          </SoftButton>
                          <SoftButton
                            variant="gradient"
                            color="dark"
                            type='submit'
                          >
                            Ajouter
                          </SoftButton>
                        </SoftBox>
                      </SoftBox>
                    </SoftBox>
                  </Card>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </SoftBox>
  );
}

export default NewSparePart;
