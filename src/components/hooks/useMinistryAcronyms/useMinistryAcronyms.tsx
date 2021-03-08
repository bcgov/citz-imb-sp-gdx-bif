import { useQuery } from "react-query"
import { GetMinistryAcronyms } from "../../API/GET/GetMinistryAcronyms"

export const useMinistryAcronyms = () => {
    return useQuery('MinistryAcronyms', GetMinistryAcronyms)
}
