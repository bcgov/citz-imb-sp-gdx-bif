import { useQuery } from "react-query"
import { GetMinistryAcronyms } from 'components'

export const useMinistryAcronyms = () => {
    return useQuery('MinistryAcronyms', GetMinistryAcronyms)
}
