import type { MutableRefObject, Dispatch, SetStateAction } from "react";
import { useEffect } from "react";

export function useOutClick(
	ref: MutableRefObject<null>,
	set: Dispatch<SetStateAction<boolean>>,
	link: Dispatch<SetStateAction<null>> | null
) {
	useEffect(() => {
		function handleClick(e: Event) {
			const node = ref.current as HTMLFormElement | null;
			const target = e.target as HTMLElement;

			if (node && !node.contains(target)) {
				if (link) {
					set(false);
					link(null);
				} else if (!node.previousElementSibling?.contains(target)) {
					set(false);
				}
			}
		}

		document.addEventListener('mousedown', handleClick, false);

		return () => {
			document.removeEventListener('mousedown', handleClick, false);
		}
	}, [ref, set, link]);
}
