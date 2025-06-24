import { Card, CardContent } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { TabsContent } from '../../components/ui/tabs';
import { SunIcon, MoonIcon, SettingsIcon } from 'lucide-react';

type AppearanceTabProps = {
	theme: string;
	setTheme: (value: string) => void;
};

export const AppearanceTab = ({ theme, setTheme }: AppearanceTabProps) => {
	return (
		<TabsContent value="appearance">
			<Card className="bg-[#E8EEF2] shadow-lg border-0 overflow-hidden">
				<CardContent className="p-6">
					<h2 className="font-['Nunito',Helvetica] font-bold text-[1.5rem] mb-6 text-[#1d1d20]">
						Appearance Settings
					</h2>

					<div className="space-y-6">
						<div>
							<Label className="text-[1rem] font-semibold mb-4 block">
								Theme
							</Label>
							<RadioGroup
								value={theme}
								onValueChange={setTheme}
								className="flex flex-col space-y-3"
							>
								<div className="flex items-center space-x-3 rounded-md border border-gray-300 p-3 hover:bg-gray-100 transition-colors cursor-pointer">
									<RadioGroupItem value="light" id="theme-light" />
									<Label
										htmlFor="theme-light"
										className="flex items-center cursor-pointer"
									>
										<SunIcon className="h-5 w-5 mr-2 text-yellow-500" />
										<span>Light Mode</span>
									</Label>
								</div>
								<div className="flex items-center space-x-3 rounded-md border border-gray-300 p-3 hover:bg-gray-100 transition-colors cursor-pointer">
									<RadioGroupItem value="dark" id="theme-dark" />
									<Label
										htmlFor="theme-dark"
										className="flex items-center cursor-pointer"
									>
										<MoonIcon className="h-5 w-5 mr-2 text-blue-700" />
										<span>Dark Mode</span>
									</Label>
								</div>
								<div className="flex items-center space-x-3 rounded-md border border-gray-300 p-3 hover:bg-gray-100 transition-colors cursor-pointer">
									<RadioGroupItem value="system" id="theme-system" />
									<Label
										htmlFor="theme-system"
										className="flex items-center cursor-pointer"
									>
										<SettingsIcon className="h-5 w-5 mr-2 text-gray-500" />
										<span>System Default</span>
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