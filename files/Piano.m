format longG
fig = figure('Name', 'Piano Controller', 'KeyPressFcn', @handleKeyDown, 'KeyReleaseFcn', @handleKeyUp);
% brick = brickConnection;
brick = 0;

% aWsEdfTgYhUj
keyboardMap = containers.Map(...
	{'a', 'w', 's', 'e', 'd', 'f', 't', 'g', 'y', 'h', 'u', 'j', 'k', 'o', 'l', 'p', 'semicolon', 'quote'},...
	{1,    2,   3,   4,   5,   6,   7,   8,   9,   10,  11,  12,  13,  14,  15,  16,  17, 18});

chromaticScale = genChromaticScale(2);

notesPlaying = containers.Map(...
	{'a', 'w', 's', 'e', 'd', 'f', 't', 'g', 'y', 'h', 'u', 'j', 'k', 'o', 'l', 'p', 'semicolon', 'quote'},...
	{false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false});

% fig.UserData = struct(...
% 	"Brick", "brick",...
% 	"KeyMap", keyboardMap,...
% 	"Notes", chromaticScale,...
% 	"NotesPlaying", notesPlawsaying...
% );

t = timer;
t.ExecutionMode = 'fixedDelay';
t.TimerFcn = @beep;

fig.UserData = struct(...
	"Brick", brick,...
	"KeyMap", keyboardMap,...
	"Notes", chromaticScale,...
	"NotesPlaying", notesPlaying,...
	"Beeping", false,...
	"BeepTimer", t...
);

function chromaticScale = genChromaticScale(octaves)
    chromaticScale = zeros(1, octaves * 12);
    freq = 523.251 / (nthroot(2, 12) ^ 12); % C5
    %freq = 293.66; % D4
    for i = 1:octaves * 12
        chromaticScale(i) = freq;
        freq = freq * nthroot(2, 12);
    end
end

function handleKeyDown(src, event)

	userData = ancestor(src, "figure", "toplevel").UserData;
	brick = userData.Brick;
	keyMap = userData.KeyMap;
	notes = userData.Notes;
	notesPlayingLocal = userData.NotesPlaying;
	beeping = userData.Beeping;
	beepTimer = userData.BeepTimer;

	if(isKey(keyMap, event.Key) && ~notesPlayingLocal(event.Key))
		% brick.playTone(100, notes(keyMap(event.Key)), 500);
		playTone(0.25, notes(keyMap(event.Key)), .5);
		notesPlayingLocal(event.Key) = true;
	end

	if event.Key == 'q'
		close(src);
	elseif event.Key == 'z'
		beeping = ~beeping;
	end

	if beeping
		start(beepTimer)
	else
		stop(beepTimer);
	end

end

function handleKeyUp(src, event)

	userData = ancestor(src, "figure", "toplevel").UserData;
	brick = userData.Brick;
	keyMap = userData.KeyMap;
	notes = userData.Notes;
	notesPlaying = userData.NotesPlaying;
			
	notesPlaying(event.Key) = false;
    
end

function beep(src, event)
	playTone(0.25, 500, .1);
end