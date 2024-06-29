// Form Data
// TODO: sync with reactive
export const handleSelectedTerm = (selectedTerm: any, termCode:any) => {
    console.log(selectedTerm)
    termCode.value = selectedTerm.termCode
  }
  
  export const handleSelectedCampus = (selectedCampus: any) => {
    console.log(selectedCampus)
  }
  export const handleSelectedPrimarySession = (selectedPrimarySession: any) => {
    console.log(selectedPrimarySession)
  }
  
  export const handleSelectedSubSession = (selectedSubSession: any) => {
    console.log(selectedSubSession)
  }
  