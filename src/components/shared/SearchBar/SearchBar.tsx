import { FC, useRef } from 'react';
import { SearchBarProps } from '.';
import { Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getNavigationPathBySearchValue } from 'utils';

export const SearchBar: FC<SearchBarProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const onKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      const value = inputRef.current?.value;
      if (!value) return;

      const navigationPath = getNavigationPathBySearchValue(value);
      if (!navigationPath) return;

      navigate(navigationPath);
    }
  };

	return <Input
		ref={inputRef}
		placeholder="Tx Hash / Block Number / Address / Contract"
		size="lg"
		onKeyDown={onKeyDown}
	/>;
};
