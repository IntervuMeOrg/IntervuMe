import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

type NavigationBarProps = {
	navigate: ReturnType<typeof useNavigate>;
	navItems: {
		name: string;
		active: boolean;
	}[];
	featuresSectionRef: React.RefObject<HTMLElement>;
	contactSectionRef: React.RefObject<HTMLElement>;
};
export const NavigationBar = ({
	navigate,
	navItems,
	featuresSectionRef,
	contactSectionRef,
}: NavigationBarProps) => {
	return (
		<motion.header className="sticky top-0 z-[999] w-full h-[8vh]">
			<nav className="w-full h-[8vh] bg-[#1d1d20] shadow-md">
				<div className="absolute inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18]" />
				<div className="relative h-full flex items-center justify-between px-[3vw]">
					{/* Logo */}
					<div
						className="[text-shadow:0px_4px_4px_#00000040] font-['Nunito',Helvetica] font-extrabold text-white text-[1.5vw] text-center tracking-[0.05em] cursor-pointer"
						onClick={() => {
							window.scrollTo({
								top: 0,
								behavior: "smooth",
							});
						}}
					>
						INTERVU ME
					</div>

					{/* Navigation links */}
					<div className="flex space-x-12 gap-[5vw]">
						{navItems.map((item) => (
							<div
								key={item.name}
								className={`font-['Nunito',Helvetica] font-semibold text-white text-[1.2vw] text-center tracking-[1.32px] ${
									item.active ? "underline" : "opacity-70"
								} cursor-pointer`}
								onClick={() => {
									if (item.name === "Features") {
										featuresSectionRef.current?.scrollIntoView({
											behavior: "smooth",
											block: "start",
										});
									} else if (item.name === "Contact Us") {
										contactSectionRef.current?.scrollIntoView({
											behavior: "smooth",
											block: "start",
										});
									} else if (item.name === "Home") {
										window.scrollTo({
											top: 0,
											behavior: "smooth",
										});
									}
								}}
							>
								{item.name}
							</div>
						))}
					</div>

					{/* Join us button */}
					<Button
						onClick={() => navigate("/login")}
						className="rounded-[5px] h-[5vh] w-[10vw] [background:linear-gradient(90deg,#0667D0_31%,#054E9D_59%,#033464_98%)] hover:opacity-90"
					>
						<span className="font-['Nunito',Helvetica] font-semibold text-white text-[1.2vw] text-center tracking-[1.32px]">
							Join us
						</span>
					</Button>
				</div>
			</nav>
		</motion.header>
	);
};
