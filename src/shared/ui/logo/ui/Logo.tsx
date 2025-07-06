import { FC } from 'react';
import { Link, LinkProps } from 'react-router';
import clsx from 'clsx';
import Collapse from '@mui/material/Collapse';

interface ILogo extends Omit<LinkProps, 'to'> {
  to?: string;
  collapsed?: boolean;
}

const Logo: FC<ILogo> = ({ collapsed = false, to = '/', ...props }) => {
  return (
    <Link
      to={to}
      {...props}
      className={clsx(
        'text-[2rem] leading-[120%] font-bold text-brand-primary !flex',
        props.className
      )}>
      .C
      <Collapse
        in={!collapsed}
        orientation='horizontal'
        collapsedSize={0}
        timeout={{ enter: 500, exit: 500 }}
        sx={{
          transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)',
        }}>
        ONTROL
      </Collapse>
    </Link>
  );
};

export { Logo };
