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

type ContactInfo = {
	phone: string;
	email: string;
	address: string;
};

type SubjectOption = {
	id: string;
	label: string;
	checked: boolean;
};

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
			viewport={{ once: true }}
			transition={{ duration: 0.6, ease: "easeOut" }}
			className="relative py-16 sm:py-20 md:py-24 lg:py-30 bg-[#1d1d20] w-full overflow-hidden"
		>
			{/* Background layers */}
			<div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-20 z-0" />
			<img
				className="absolute inset-0 w-full h-full object-cover z-0"
				alt="Contact background"
				src="/rectangle.png"
			/>

			{/* Main Content */}
			<div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
				{/* Page Title */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.2, duration: 0.5 }}
					className="text-center mb-2 sm:mb-4"
				>
					<h2 className="font-['Nunito'] font-bold text-black text-2xl sm:text-3xl md:text-4xl mb-4">
						Contact Us
					</h2>
					<p className="font-['Nunito'] font-medium text-[#1d1d20]/70 text-base sm:text-lg">
						Any question or remarks? Just write us a message!
					</p>
				</motion.div>

				{/* Contact Card */}
				<div className="max-w-6xl mx-auto">
					<Card className="shadow-2xl rounded-xl overflow-hidden">
						<CardContent className="p-0">
							<div className="flex flex-col lg:flex-row min-h-[4rem] md:min-h-[10rem] lg:min-h-[16rem] xl:min-h-[28rem]">
								{/* Left Side - Contact Information */}
								<div className="lg:w-2/5 bg-[#1d1d20] p-8 sm:p-10 lg:p-12 relative overflow-hidden">
									<div className="absolute inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18]" />

									<div className="relative z-10 h-full flex flex-col">
										<h3 className="font-['Nunito'] font-semibold text-white text-xl sm:text-2xl mb-2">
											Contact Information
										</h3>
										<p className="font-['Nunito'] text-[#c8c8c8] text-sm sm:text-base mb-12">
											Say something to start a live chat!
										</p>

										{/* Contact Details */}
										<div className="space-y-6 mb-auto">
											<div className="flex items-center gap-4">
												<PhoneIcon className="w-4 h-4 text-white flex-shrink-0" />
												<span className="font-['Nunito'] text-white text-sm sm:text-base">
													{contactInfo.phone}
												</span>
											</div>

											<div className="flex items-center gap-4">
												<MailIcon className="w-4 h-4 text-white flex-shrink-0" />
												<span className="font-['Nunito'] text-white text-sm sm:text-base break-all">
													{contactInfo.email}
												</span>
											</div>

											<div className="flex gap-4">
												<MapPinIcon className="w-4 h-4 text-white flex-shrink-0 mt-1" />
												<span className="font-['Nunito'] text-white text-sm sm:text-base">
													{contactInfo.address}
												</span>
											</div>
										</div>

										{/* Social Media Icons */}
										<div className="flex gap-4 mt-12">
											{[TwitterIcon, InstagramIcon, YoutubeIcon].map(
												(Icon, index) => (
													<motion.button
														key={index}
														initial={{ opacity: 0 }}
														whileInView={{ opacity: 1 }}
														viewport={{ once: true }}
														transition={{ duration: 0.3, delay: index * 0.1 }}
														whileHover={{ scale: 1.1 }}
														whileTap={{ scale: 0.95 }}
														className="w-9 h-9 bg-black/50 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
													>
														<Icon className="w-4 h-4 text-white" />
													</motion.button>
												)
											)}
										</div>
									</div>
								</div>

								{/* Right Side - Contact Form */}
								<div className="lg:w-3/5 bg-white p-6 sm:p-8 lg:p-10">
									<form className="h-full flex flex-col">
										{/* Name Fields */}
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
											<motion.div
												initial={{ opacity: 0, y: 20 }}
												whileInView={{ opacity: 1, y: 0 }}
												viewport={{ once: true }}
												transition={{ delay: 0.2 }}
											>
												<Label className="font-['Nunito'] font-medium text-[#8d8d8d] text-xs">
													First Name
												</Label>
												<Input className="border-t-0 border-l-0 border-r-0 rounded-none h-8 px-0 focus-visible:ring-0" />
											</motion.div>

											<motion.div
												initial={{ opacity: 0, y: 20 }}
												whileInView={{ opacity: 1, y: 0 }}
												viewport={{ once: true }}
												transition={{ delay: 0.3 }}
											>
												<Label className="font-['Nunito'] font-medium text-[#8d8d8d] text-xs">
													Last Name
												</Label>
												<Input className="border-t-0 border-l-0 border-r-0 rounded-none h-8 px-0 focus-visible:ring-0" />
											</motion.div>
										</div>

										{/* Contact Fields */}
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mt-6">
											<motion.div
												initial={{ opacity: 0, y: 20 }}
												whileInView={{ opacity: 1, y: 0 }}
												viewport={{ once: true }}
												transition={{ delay: 0.4 }}
											>
												<Label className="font-['Nunito'] font-medium text-[#8d8d8d] text-xs">
													Email
												</Label>
												<Input className="border-t-0 border-l-0 border-r-0 rounded-none h-8 px-0 focus-visible:ring-0" />
											</motion.div>

											<motion.div
												initial={{ opacity: 0, y: 20 }}
												whileInView={{ opacity: 1, y: 0 }}
												viewport={{ once: true }}
												transition={{ delay: 0.5 }}
											>
												<Label className="font-['Nunito'] font-medium text-[#8d8d8d] text-xs">
													Phone Number
												</Label>
												<Input className="border-t-0 border-l-0 border-r-0 rounded-none h-8 px-0 focus-visible:ring-0" />
											</motion.div>
										</div>

										{/* Subject Selection */}
										<div className="mt-8">
											<h3 className="font-['Nunito'] font-extrabold text-black text-xs mb-4">
												Select Subject?
											</h3>
											<RadioGroup
												defaultValue="general1"
												className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 sm:gap-6"
											>
												{subjectOptions.map((option) => (
													<div
														key={option.id}
														className="flex items-center space-x-2"
													>
														<RadioGroupItem
															value={option.id}
															id={option.id}
															className="text-black"
															defaultChecked={option.checked}
														/>
														<Label
															htmlFor={option.id}
															className="font-['Nunito'] font-semibold text-black text-xs"
														>
															{option.label}
														</Label>
													</div>
												))}
											</RadioGroup>
										</div>

										{/* Message */}
										<div className="mt-8 flex-grow">
											<Label className="font-['Nunito'] font-medium text-[#8d8d8d] text-xs">
												Message
											</Label>
											<Textarea
												placeholder="Write your message..."
												className="border-t-0 border-l-0 border-r-0 rounded-none resize-none h-10 px-0 focus-visible:ring-0 font-['Nunito'] font-medium text-[#8d8d8d] text-sm"
											/>
										</div>

										{/* Send Button */}
										<motion.div
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true }}
											transition={{ delay: 0.6 }}
											className="mt-8 flex justify-center sm:justify-end"
										>
											<Button className="px-6 sm:px-8 py-2.5 rounded-md shadow-lg bg-gradient-to-r from-[#0667D0] via-[#054E9D] to-[#033464] hover:opacity-90 transition-opacity font-['Nunito'] font-medium text-white text-base sm:text-lg">
												Send Message
											</Button>
										</motion.div>
									</form>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</motion.section>
	);
};