import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Burger from './Burger';
import Menu from './Menu';
import Logo from '../img/logo_remove.png';

const LogoImg = styled.img`
    top: 3%;
    right: 2rem;
    width: 5rem;
    height: 5rem;
    cursor: pointer;
    z-index: 100;
    position: fixed;
`;

const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) return;
            handler(event);
        };
        document.addEventListener('mousedown', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
        };
    }, [ref, handler]);
};

const Header = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const node = useRef();
    useOnClickOutside(node, () => setOpen(false));
    return (
        <div ref={node}>
            <Burger open={open} setOpen={setOpen} />
            <LogoImg
                src={Logo}
                onClick={() => {
                    navigate('/');
                }}
            ></LogoImg>
        </div>
    );
};

export default Header;
