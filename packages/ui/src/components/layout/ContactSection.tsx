/**
 * ContactSection Component - Reusable contact section with form and information display
 */

import { Card, CardContent } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";

import { motion } from "framer-motion";

import {
	InstagramIcon,
	MailIcon,
	MapPinIcon,
	PhoneIcon,
	TwitterIcon,
	YoutubeIcon,
} from "lucide-react";

// Contact information type definition
type ContactInfo = {
	phone: string;
	email: string;
	address: string;
};

// Subject option type definition
type SubjectOption = {
	id: string;
	label: string;
	checked: boolean;
};

// Props type definition
type ContactSectionProps = {
	contactSectionRef: React.RefObject<HTMLElement>;
	contactInfo: ContactInfo;
	subjectOptions: SubjectOption[];
};

export const ContactSection = ({
	contactSectionRef,
	contactInfo,
	subjectOptions,
}: ContactSectionProps): JSX.Element => {
	return (
		<motion.section
			id="contact-section"
			ref={contactSectionRef}
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-20% 0px" }}
			transition={{ type: "spring", stiffness: 80, damping: 18, mass: 0.7 }}
			className="relative py-[10vh] bg-[#1d1d20] w-full"
		>

			<div className="absolute inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18] z-[1]" />
			{/* Contact Us background image */}
			<img
				className="absolute inset-0 w-full h-full object-cover z-0"
				alt="Contactus background"
				src="/rectangle.png"
			/>
			{/* Main Content */}
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
				className="flex flex-col items-center relative z-10 px-[8vw] pt-[6vh] pb-[5vh]"
			>
				{/* Page Title */}
				<div className="w-full max-w-[800px] text-center mb-[5vh]">
					<h1 className="[font-family:'Nunito',Helvetica] font-bold text-black text-[41px] tracking-[0] leading-[normal]">
						Contact Us
					</h1>
					<p className="mt-4 opacity-[0.71] [font-family:'Nunito',Helvetica] font-medium text-[#1d1d20] text-lg text-center tracking-[0] leading-[normal]">
						Any question or remarks? Just write us a message!
					</p>
				</div>


				{/* Contact Card */}
				<div className="w-full max-w-[1200px] px-4 sm:px-8 md:px-16 lg:px-0 flex items-center justify-center">
				<Card className="min-w-[1200px] mx-auto mb-[10vh] shadow-[0px_4px_4px_#00000040] rounded-[10px] ">
					<CardContent className="p-0 h-full ">
						<div className="relative h-[666px]">
							<div className="absolute w-[1200px] h-[667px] top-0 left-0 bg-white rounded-[10px] shadow-[0px_0px_60px_30px_#00000008]">
								{/* Left Side - Contact Information */}
								<div className="relative w-[491px] h-[647px] top-2.5 left-2.5 overflow-hidden rounded-[10px]">
									<div className="relative h-[620px] top-[3px] rounded-[10px]">
										<div className="absolute w-[491px] h-[630px] top-0 left-0 bg-[#1d1d20] rounded-[10px]">
											<div className="h-[630px] rounded-[10px] [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18]" />
										</div>

										<h2 className="top-[38px] left-[40px] text-[30px] absolute [font-family:'Nunito',Helvetica] font-semibold text-white leading-[normal]">
											Contact Information
										</h2>

										<div className="absolute w-[339px] h-[194px] top-[225px] left-[40px]">
											<div className="absolute w-[183px] h-3 top-0 left-0 flex items-center gap-2">
												<PhoneIcon className="w-4 h-4 text-white" />
												<span className="[font-family:'Nunito',Helvetica] font-normal text-white text-[19px]">
													{contactInfo.phone}
												</span>
											</div>

											<div className="absolute w-[188px] h-3 top-[74px] left-0 flex items-center gap-2">
												<MailIcon className="w-4 h-4 text-white flex-shrink-0" />
												<span className="[font-family:'Nunito',Helvetica] font-normal text-white text-[19px] ">
													{contactInfo.email}
												</span>
											</div>

											<div className="absolute flex top-[148px] left-0 gap-2">
												<MapPinIcon className="w-4 h-4 text-white flex-shrink-0" />
												<span className="w-72 [font-family:'Nunito',Helvetica] font-normal text-white text-[19px]">
													{contactInfo.address}
												</span>
											</div>
										</div>

										<p className="absolute top-[86px] left-[40px] [font-family:'Nunito',Helvetica] font-normal text-[#c8c8c8] text-[19px] tracking-[0] leading-[normal]">
											Say something to start a live chat!
										</p>

										{/* Social Media Icons */}
										<div className="absolute bottom-[25px] left-[40px] flex space-x-4">
											<motion.button
												initial={{ opacity: 0 }}
												whileInView={{ opacity: 1 }}
												viewport={{ once: true }}
												transition={{
													duration: 0.1,
													ease: "easeOut",
													delay: 0.05,
												}}
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.95 }}
												className="w-[35px] h-[35px] bg-[#1a1a1a] rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
											>
												<TwitterIcon className="w-4 h-4 text-white" />
											</motion.button>
											<motion.button
												initial={{ opacity: 0 }}
												whileInView={{ opacity: 1 }}
												viewport={{ once: true }}
												transition={{
													duration: 0.1,
													ease: "easeOut",
													delay: 0.05,
												}}
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.95 }}
												className="w-[35px] h-[35px] bg-[#1a1a1a] rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
											>
												<InstagramIcon className="w-4 h-4 text-white" />
											</motion.button>
											<motion.button
												initial={{ opacity: 0 }}
												whileInView={{ opacity: 1 }}
												viewport={{ once: true }}
												transition={{
													duration: 0.1,
													ease: "easeOut",
													delay: 0.05,
												}}
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.95 }}
												className="w-[35px] h-[35px] bg-[#1a1a1a] rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
											>
												<YoutubeIcon className="w-4 h-4 text-white" />
											</motion.button>
										</div>
									</div>
								</div>

								{/* Right Side - Contact Form */}
								<div className="absolute left-[551px] top-[55px] w-[599px]">
									<div className="flex gap-10">
										{/* First Name */}
										<motion.div
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true, margin: "-10% 0px" }}
											transition={{ delay: 0.2 }}
											className="w-[280px]"
										>
											<Label className="[font-family:'Nunito',Helvetica] font-medium text-[#8d8d8d] text-xs">
												First Name
											</Label>
											<Input className="border-t-0 border-l-0 border-r-0 rounded-none h-8 px-0 focus-visible:ring-0" />
										</motion.div>

										{/* Last Name */}
										<motion.div
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true, margin: "-10% 0px" }}
											transition={{ delay: 0.2 }}
											className="w-[280px]"
										>
											<Label className="[font-family:'Nunito',Helvetica] font-medium text-[#8d8d8d] text-xs tracking-[0] leading-5">
												Last Name
											</Label>
											<Input className="border-t-0 border-l-0 border-r-0 rounded-none h-8 px-0 focus-visible:ring-0" />
										</motion.div>
									</div>

									<div className="flex gap-10 mt-5">
										{/* Email */}
										<motion.div
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true, margin: "-10% 0px" }}
											transition={{ delay: 0.2 }}
											className="w-[280px]"
										>
											<Label className="[font-family:'Nunito',Helvetica] font-medium text-[#8d8d8d] text-xs tracking-[0] leading-5">
												Email
											</Label>
											<Input className="border-t-0 border-l-0 border-r-0 rounded-none h-8 px-0 focus-visible:ring-0" />
										</motion.div>

										{/* Phone Number */}
										<motion.div
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true, margin: "-10% 0px" }}
											transition={{ delay: 0.2 }}
											className="w-[280px]"
										>
											<Label className="[font-family:'Nunito',Helvetica] font-medium text-[#8d8d8d] text-xs tracking-[0] leading-5">
												Phone Number
											</Label>
											<Input className="border-t-0 border-l-0 border-r-0 rounded-none h-8 px-0 focus-visible:ring-0" />
										</motion.div>
									</div>

									{/* Subject Selection */}
									<div className="mt-8">
										<h3 className="[font-family:'Nunito',Helvetica] font-extrabold text-black text-xs tracking-[0] leading-5 mb-[20px]">
											Select Subject?
										</h3>
										<RadioGroup
											defaultValue="general1"
											className="flex flex-wrap gap-8"
										>
											{subjectOptions.map((option) => (
												<div
													key={option.id}
													className="flex items-center space-x-2"
												>
													<RadioGroupItem
														value={option.id}
														id={option.id}
														className={"text-black"}
														defaultChecked={option.checked}
													/>
													<Label
														htmlFor={option.id}
														className="[font-family:'Nunito',Helvetica] font-semibold text-black text-xs tracking-[0] leading-5"
													>
														{option.label}
													</Label>
												</div>
											))}
										</RadioGroup>
									</div>

									{/* Message */}
									<div className="mt-8">
										<Label className="[font-family:'Nunito',Helvetica] font-medium text-[#8d8d8d] text-xs tracking-[0] leading-5">
											Message
										</Label>
										<Textarea
											placeholder="Write your message..."
											className="border-t-0 border-l-0 border-r-0 rounded-none resize-none h-8 px-0 focus-visible:ring-0 [font-family:'Nunito',Helvetica] font-medium text-[#8d8d8d] text-sm tracking-[0] leading-5"
										/>
									</div>

									{/* Send Message Button */}
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.6 }}
										className="mt-6 flex justify-end"
									>
										<Button className="px-8 rounded-[5px] shadow-[0px_0px_14px_#0000001f] [background:linear-gradient(90deg,rgba(6,103,208,1)_31%,rgba(5,78,157,1)_59%,rgba(3,52,106,1)_98%)] hover:opacity-90 transition-opacity [font-family:'Nunito',Helvetica] font-medium text-white text-[18px]">
											Send Message
										</Button>
									</motion.div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
				</div>
			</motion.div>
		</motion.section>
	);
};