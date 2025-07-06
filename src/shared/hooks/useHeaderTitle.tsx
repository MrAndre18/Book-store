import { useEffect } from 'react';
import { useAppDispatch } from './redux';
import {
  resetHeader,
  setHeader,
} from '@shared/ui/layouts/app-layout/ui/header';

type BackLink = { to: string; text: string };

interface UseHeaderTitleProps {
  title: string;
  backLink?: BackLink;
}

export function useHeaderTitle({ title, backLink }: UseHeaderTitleProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setHeader({ title, backLink }));
    return () => {
      dispatch(resetHeader());
    };
  }, []);
}
