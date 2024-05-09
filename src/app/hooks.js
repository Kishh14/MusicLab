import { useDispatch, useSelector } from "react-redux";

/**
 * @type {import('react-redux').UseDispatch<import('@reduxjs/toolkit').Dispatch<import('../types/redux').AppDispatch>>}
 */
export const useAppDispatch = useDispatch.withTypes();

/**
 * @type {import("react-redux").UseSelector<import("../types/redux").RootState>}
 */
export const useAppSelector = useSelector.withTypes();
