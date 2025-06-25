import { Card, CardContent } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { TabsContent } from "../../components/ui/tabs";

type PrivacyTabProps = {
	profileVisibility: string;
	setProfileVisibility: (value: string) => void;
};

export const PrivacyTab = ({
	profileVisibility,
	setProfileVisibility,
}: PrivacyTabProps) => {
	return (
		<TabsContent value="privacy">
			<Card className="bg-[#E8EEF2] shadow-lg border-0 overflow-hidden">
				<CardContent className="p-6">
					<h2 className="font-['Nunito',Helvetica] font-bold text-[1.5rem] mb-6 text-[#1d1d20]">
						Privacy Settings
					</h2>

					<div className="space-y-6">
						<div>
							<Label className="text-[1rem] font-semibold mb-4 block">
								Profile Visibility
							</Label>
							<RadioGroup
								value={profileVisibility}
								onValueChange={setProfileVisibility}
								className="flex flex-col space-y-3"
							>
								<div className="flex items-center space-x-3 rounded-md border border-gray-300 p-3 hover:bg-gray-100 transition-colors cursor-pointer">
									<RadioGroupItem value="public" id="visibility-public" />
									<Label htmlFor="visibility-public" className="cursor-pointer">
										Public
									</Label>
								</div>
								<div className="flex items-center space-x-3 rounded-md border border-gray-300 p-3 hover:bg-gray-100 transition-colors cursor-pointer">
									<RadioGroupItem value="private" id="visibility-private" />
									<Label
										htmlFor="visibility-private"
										className="cursor-pointer"
									>
										Private
									</Label>
								</div>
								<div className="flex items-center space-x-3 rounded-md border border-gray-300 p-3 hover:bg-gray-100 transition-colors cursor-pointer">
									<RadioGroupItem value="custom" id="visibility-custom" />
									<Label htmlFor="visibility-custom" className="cursor-pointer">
										Custom
									</Label>
								</div>
							</RadioGroup>
						</div>
					</div>
				</CardContent>
			</Card>
		</TabsContent>
	);
};
