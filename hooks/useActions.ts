import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';

export function useActions(actions: any | any[]) {
  const dispatch = useDispatch();
  return Array.isArray(actions)
    ? actions.map((a) => bindActionCreators(a, dispatch))
    : bindActionCreators(actions, dispatch);
}
