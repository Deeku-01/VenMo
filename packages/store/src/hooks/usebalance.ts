import { useRecoilValue } from "recoil"
import { balanceAtom } from "../atoms/balance"

export const usebalance = () => {
    const value = useRecoilValue(balanceAtom);
    return value;
}   