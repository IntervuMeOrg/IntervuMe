import { Card, CardContent } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { TabsContent } from "../../components/ui/tabs";

type LanguageTabProps = {
	language: string;
	setLanguage: (value: string) => void;
};

export const LanguageTab = ({ language, setLanguage }: LanguageTabProps) => {
	return (
		<TabsContent value="language">
			<Card className="bg-[#E8EEF2] shadow-lg border-0 overflow-hidden">
				<CardContent className="p-6">
					<h2 className="font-['Nunito',Helvetica] font-bold text-[1.5rem] mb-6 text-[#1d1d20]">
						Language Settings
					</h2>

					<div className="space-y-6">
						<div>
							<Label className="text-[1rem] font-semibold mb-4 block">
								Preferred Language
							</Label>
							<RadioGroup
								value={language}
								onValueChange={setLanguage}
								className="flex flex-col space-y-3"
							>
								<div className="flex items-center space-x-3 rounded-md border border-gray-300 p-3 hover:bg-gray-100 transition-colors cursor-pointer">
									<RadioGroupItem value="english" id="lang-english" />
									<Label htmlFor="lang-english" className="cursor-pointer">
										English
									</Label>
								</div>
								<div className="flex items-center space-x-3 rounded-md border border-gray-300 p-3 hover:bg-gray-100 transition-colors cursor-pointer">
									<RadioGroupItem value="spanish" id="lang-spanish" />
									<Label htmlFor="lang-spanish" className="cursor-pointer">
										Spanish
									</Label>
								</div>
								<div className="flex items-center space-x-3 rounded-md border border-gray-300 p-3 hover:bg-gray-100 transition-colors cursor-pointer">
									<RadioGroupItem value="french" id="lang-french" />
									<Label htmlFor="lang-french" className="cursor-pointer">
										French
									</Label>
								</div>
								<div className="flex items-center space-x-3 rounded-md border border-gray-300 p-3 hover:bg-gray-100 transition-colors cursor-pointer">
									<RadioGroupItem value="arabic" id="lang-arabic" />
									<Label htmlFor="lang-arabic" className="cursor-pointer">
										Arabic
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