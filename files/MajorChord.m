format longG
global key
InitKeyboard();

majorScaleSteps = containers.Map(...
    {1, 2, 3, 4, 5, 6, 7},...
    {'W', 'W', 'H', 'W', 'W', 'W', 'H'});

majorScale = genMajorScale(majorScaleSteps, 3);

% aWsEdfTgYhUj

chordDegree = 1;
while true

	pause(0.1);
    
	switch key
		case 'space'
			% brickConnection.playTone(25, majorScale(chordDegree), 500);
			playTone(0.25, majorScale(chordDegree), .5);
			disp(majorScale(chordDegree));
			chordDegree = chordDegree + 1;
			if chordDegree > length(majorScale)
				chordDegree = 1;
			end
		case 'd'
			% brickConnection.playTone(25, majorScale(chordDegree), 500);
			playTone(0.25, majorScale(chordDegree), .5);
			disp(majorScale(chordDegree));
			chordDegree = chordDegree + 2;
			if chordDegree > length(majorScale)
				chordDegree = 1;
			end		
		case 'a'
			playTone(0.25, majorScale(randi(length(majorScale))), .5);
		case 's'
			nextDegree = 1 + (randi( ceil((length(majorScale) - 1) / 2) + 1) - 1) * 2;
			display(nextDegree);
			playTone(0.25, majorScale(nextDegree), .5);
		case 'w'
			% playArp(50, brickConnection, majorScale);
			playArp(.5, majorScale);
		case 'q'
			break;
	end

end

CloseKeyboard();

function majorScale = genMajorScale(majorScaleSteps, octaves)
    majorScale = zeros(1, 15);
    % freq = 523.251; % C5
    freq = 293.66; % D4
    scaleDegree = 1;
    for i = 1:15
        majorScale(i) = freq;
        if majorScaleSteps(scaleDegree) == 'W'
            freq = freq * (nthroot(2, 12) ^ 2);
        else
            freq = freq * nthroot(2, 12);
        end
        %if freq > 1046
         %   freq = 523.251;
        %end
        scaleDegree = scaleDegree + 1;
        if scaleDegree == 8
            scaleDegree = 1;
        end
    end
end

function playArp(vol, majorScale)
	playTone(vol, majorScale(1), .5);
	pause(.25);
	playTone(vol, majorScale(7), .5);
	pause(.25);
	playTone(vol, majorScale(5), .5);
	pause(.25); 
	playTone(vol, majorScale(10), .5);
	pause(.5);
	playTone(vol, majorScale(7), .5);
	pause(.25);
	playTone(vol, majorScale(5), .5);
	pause(.25);
	playTone(vol, majorScale(7), .5);
	pause(.5);
end
% function playArp(vol, brickConnection, majorScale)
% 	brickConnection.playTone(vol, majorScale(1), 500);
% 	pause(.25);
% 	brickConnection.playTone(vol, majorScale(5), 500);
% 	pause(.25);
% 	brickConnection.playTone(vol, majorScale(3), 500);
% 	pause(.25); 
% 	brickConnection.playTone(vol, majorScale(7), 500);
% end