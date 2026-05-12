% https://pages.mtu.edu/~suits/notefreqs.html
% https://www.doctormix.com/docs/Note-To-Frequancy-Chart.jpg
% https://en.wikipedia.org/wiki/Major_scale
format longG
freq = 523.251; % C5
%C5 W W H W W W H(C6) W W H W W W H(C7)
% C, D, E, F, G, A, B
majorScaleSteps = containers.Map(...
    {1, 2, 3, 4, 5, 6, 7},...
    {'W', 'W', 'H', 'W', 'W', 'W', 'H'});
scaleDegree = 1;
for i = 1:15 % 2 octaves
    brickConnection.playTone(25, freq, 500);
    fprintf(num2str(freq) + "\n");
    if majorScaleSteps(scaleDegree) == 'W'
        freq = freq * (nthroot(2, 12) ^ 2);
    else
        freq = freq * nthroot(2, 12);
    end
    if freq > 1046
        freq = 523.251;
    end
    scaleDegree = scaleDegree + 1;
    if scaleDegree == 8
        scaleDegree = 1;
    end
    pause(0.5);
end