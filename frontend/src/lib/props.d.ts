import { ReactNode } from "react";
import { ILink } from "./global";

export interface ChildProp {
	children: JSX.Element | JSX.Element[] | null;
}

export interface ErrorProp {
	hide: Dispatch<SetStateAction<null>>;
	errors: never;
}

export interface FormProp extends ChildProp {
	action: string;
	method: string;
	errors: Dispatch<SetStateAction<null>>;
}

export interface FormLinkProp extends ChildProp {
	errors: (errors: never) => void;
	add: (link: ILink) => void;
	edit: (id: string, title: string, url: string, description: string) => void;
	delet: (id: string) => void;
	link: ILink | null;
	setVisible: Dispatch<SetStateAction<boolean>>;
	setLink: Dispatch<SetStateAction<null>>;
}

export interface LinkProp {
	link: ILink;
	change: (value: never) => void;
}
